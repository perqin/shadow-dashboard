const Router = require('koa-router')
const nodeController = require('../controllers/node')

const router = new Router()

router.get('/nodes', async ctx => {
  await nodeController.listNodes(ctx)
})

router.post('/nodes', async ctx => {
  await nodeController.createNode(ctx)
})

module.exports = router
