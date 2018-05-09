const Cow = require('../models/cow')

async function start () {
  await Cow.start()
}

module.exports = {
  start
}
