const Router = require('koa-router')
const subscriptionController = require('../controllers/subscription')

const router = new Router()

router.get('/subscriptions', async ctx => {
  await subscriptionController.listSubscriptions(ctx)
})

router.get('/subscriptions/:subscriptionId', async ctx => {
  await subscriptionController.getSubscriptionById(ctx)
})

router.post('/subscriptions', async ctx => {
  await subscriptionController.createSubscription(ctx)
})

router.post('/subscriptions/:subscriptionId/update', async ctx => {
  await subscriptionController.updateSubscriptionNodes(ctx)
})

router.put('/subscriptions/:subscriptionId', async ctx => {
  await subscriptionController.updateSubscription(ctx)
})

router.del('/subscriptions/:subscriptionId', async ctx => {
  await subscriptionController.removeSubscription(ctx)
})

module.exports = router
