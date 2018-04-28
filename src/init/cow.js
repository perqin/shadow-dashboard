const cow = require('../services/cow')

async function start () {
  await cow.start()
}

module.exports = {
  start
}
