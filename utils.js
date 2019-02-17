const marked = require('marked')
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
      },
      get md() {
        return marked(data)
      }
    }[type] || data)
}
