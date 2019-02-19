const bluebird = require('bluebird')
const marked = require('marked')
const yaml = require('yamljs')
const path = require('path')
const express = require('express')

const utils = require('./utils')

const fs = bluebird.promisifyAll(require('fs'))
const app = express()
const port = process.env.PORT || 4000

app.listen(port)

const getResources = async directory =>
  await Promise.all(
    (await fs.readdirAsync(directory)).map(child =>
      fs.lstatSync(directory + '/' + child).isDirectory()
        ? getResources(directory + '/' + child)
        : directory + '/' + child
    )
  )

getResources('./docs').then(resource => {
  resource
    .flat(Infinity)
    .map(resource => ({
      resource,
      route: resource
        .split('/')
        .map(x => utils.resourceWithoutOrder(utils.filenameWithoutExtension(x)))
        .join('/')
    }))
    .forEach(route => {
      app.get(route.route, async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        return res.send({
          data: utils.parseData(
            await fs.readFileAsync(route.resource, 'utf8'),
            path.extname(route.resource).replace('.', '')
          )
        })
      })
    })
})
