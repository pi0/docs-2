const bluebird = require('bluebird')
const fs = bluebird.promisifyAll(require('fs'))
const yaml = require('yamljs')

const getResources = async (directory, { ignoreFiles = [] }) =>
  await Promise.all(
    (await fs.readdirAsync(directory))
      .filter(child => !ignoreFiles.includes(child))
      .map(child =>
        fs.lstatSync(`${directory}/${child}`).isDirectory()
          ? getResources(`${directory}/${child}`, { ignoreFiles })
          : `${directory}/${child}`
      )
  )

module.exports = {
  filenameWithoutExtension: filename =>
    filename
      .split('.')
      .filter((x, i, { length }) => (length > 1 ? i + 1 !== length : true))
      .join(),
  resourceWithoutOrder: resource => resource.replace(/^\d*-/gm, ''),
  parseData: (data, type) =>
    ({
      get yml() {
        return yaml.parse(data)
      }
    }[type] || data),
  toPayload: resource => `${JSON.stringify(resource, null, 2)}\n`,
  getResources
}
