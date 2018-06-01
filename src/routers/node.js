const Router = require('koa-router')
const nodeController = require('../controllers/node')

const router = new Router()

router.get('/nodes/config', async ctx => {
  await nodeController.getConfig(ctx)
})

router.put('/nodes/config', async ctx => {
  await nodeController.updateConfig(ctx)
})

router.get('/nodes', async ctx => {
  await nodeController.listNodes(ctx)
})

router.get('/nodes/:nodeId', async ctx => {
  await nodeController.getNodeById(ctx)
})

router.post('/nodes', async ctx => {
  await nodeController.createNode(ctx)
})

router.put('/nodes/:nodeId', async ctx => {
  await nodeController.updateNodeById(ctx)
})

router.put('/nodes/:nodeId/enabled', async ctx => {
  await nodeController.setNodeEnabledById(ctx)
})

router.del('/nodes/:nodeId', async ctx => {
  await nodeController.removeNodeById(ctx)
})

module.exports = router
