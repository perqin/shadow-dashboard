const Cow = require('../models/cow')

async function start () {
  await Cow.reload()
}

module.exports = {
  start
}
