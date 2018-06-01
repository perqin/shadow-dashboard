const Cow = require('../models/cow')

async function start () {
  await Cow.loadConfig()
}

module.exports = {
  start
}
