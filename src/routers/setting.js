const Router = require('koa-router')
const settingController = require('../controllers/setting')

const router = new Router()

router.get('/settings/:name', async ctx => {
  await settingController.getSettingByName(ctx)
})

router.put('/settings/:name', async ctx => {
  await settingController.updateSettingByName(ctx)
})

module.exports = router
