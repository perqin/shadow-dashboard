const CowService = require('../services/cow')
const cowService = new CowService(require('../models/cow'))

async function getConfig (ctx) {
  ctx.body = await cowService.getConfig()
}

async function updateConfig (ctx) {
  await cowService.updateConfig(ctx.request.fields)
  ctx.response.status = 200
}

module.exports = {
  getConfig,
  updateConfig
}
