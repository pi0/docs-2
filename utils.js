const yaml = require('yamljs')

module.exports = {
  filenameWithoutExtension: filename =>
    filename
      .split('.')
      .filter((x, i, arr) => (arr.length > 1 ? i + 1 !== arr.length : true))
      .join(),
  resourceWithoutOrder: resource => resource.replace(/^\d*-/gm, ''),
  parseData: (data, type) =>
    ({
      get yml() {
        return yaml.parse(data)
      }
    }[type] || data),
  toPayload: resource => `${JSON.stringify(resource, null, 2)}\n`
}
