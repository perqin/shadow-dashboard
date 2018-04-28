const Router = require('koa-router')
const subscriptionController = require('../controllers/subscription')

const router = new Router()

router.get('/subscriptions', async ctx => {
  await subscriptionController.listSubscriptions(ctx)
})

router.post('/subscriptions', async ctx => {
  await subscriptionController.createSubscription(ctx)
})

router.post('/subscriptions/:subscriptionId/update', async ctx => {
  await subscriptionController.updateSubscriptionNodes(ctx)
})

module.exports = router
