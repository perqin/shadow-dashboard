const Node = require('../models/node')
const Cow = require('../models/cow')

async function loadJsonConfigs () {
  await Node.jsonConfig.loadOrSave()
  await Cow.jsonConfig.loadOrSave()
}

module.exports = {
  loadJsonConfigs
}
