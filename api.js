const bluebird = require('bluebird')
const path = require('path')
const express = require('express')

const utils = require('./utils')

const fs = bluebird.promisifyAll(require('fs'))
const app = express()
const port = process.env.PORT || 4000

app.listen(port)

const getResources = async (directory, { ignoreFiles = [] }) =>
  await Promise.all(
    (await fs.readdirAsync(directory))
      .filter(child => ignoreFiles.indexOf(child) === -1)
      .map(child =>
        fs.lstatSync(directory + '/' + child).isDirectory()
          ? getResources(directory + '/' + child, { ignoreFiles })
          : directory + '/' + child
      )
  )

getResources('./docs', {
  ignoreFiles: ['.DS_Store']
}).then(resource => {
  const resources = resource.flat(Infinity).map(resource => ({
    resource,
    route: resource
      .split('/')
      .map(x => utils.resourceWithoutOrder(utils.filenameWithoutExtension(x)))
      .join('/')
  }))
  app.get('/docs', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(
      utils.toPayload(
        Object.assign(
          {},
          ...resources.map(resource => ({
            [resource.route.substring(1).replace(/([\/-])/gm, '_')]: `${
              req.protocol
              }://${req.headers.host}${resource.route}`
          }))
        )
      )
    )
  })
  resources.forEach(route => {
    app.get(route.route, async (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      return res.send(
        utils.toPayload({
          data: utils.parseData(
            await fs.readFileAsync(route.resource, 'utf8'),
            path.extname(route.resource).replace('.', '')
          )
        })
      )
    })
  })
})
