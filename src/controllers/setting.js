const SettingService = require('../services/setting')
const settingService = new SettingService(require('../models/cow'))

async function getSettingByName (ctx) {
  ctx.body = await settingService.getSettingByName(ctx.params.name)
}

async function updateSettingByName (ctx) {
  await settingService.updateSettingByName(ctx.params.name, ctx.request.fields)
  ctx.response.status = 200
}

module.exports = {
  getSettingByName,
  updateSettingByName
}
