const Router = require('koa-router')
const cowController = require('../controllers/cow')

const router = new Router()

router.get('/cow/config', async ctx => {
  await cowController.getConfig(ctx)
})

router.put('/cow/config', async ctx => {
  await cowController.updateConfig(ctx)
})

module.exports = router
