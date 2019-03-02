const bluebird = require('bluebird')
const path = require('path')
const express = require('express')

const utils = require('./utils')
const { getReleases } = require('./releases')

const fs = bluebird.promisifyAll(require('fs'))
const app = express()
const port = process.env.PORT || 4000

app.listen(port)
;(async () => {
  const resources = (await utils.getResources('./docs', {
    ignoreFiles: ['.DS_Store']
  }))
    .flat(Infinity)
    .map(resource => ({
      resource,
      route: resource
        .split('/')
        .map(x => utils.resourceWithoutOrder(utils.filenameWithoutExtension(x)))
        .join('/')
    }))

  app.get('/docs', async ({ protocol, headers }, res) => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(
      utils.toPayload(
        Object.assign(
          {},
          ...resources.map(({ route }) => ({
            [route.substring(1).replace(/([\/-])/gm, '_')]: `${protocol}://${
              headers.host
            }${route}`
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

  app.get('/docs/releases', async (req, res) => {
    try {
      const releases = await getReleases()
      res.json(releases)
    } catch (error) {
      res.statusCode = 500
      res.end(JSON.stringify(error.response ? error.response.data : { error: error + '' }))
    }
  })
})()
