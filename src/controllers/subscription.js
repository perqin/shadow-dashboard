const SubscriptionService = require('../services/subscription')
const subscriptionService = new SubscriptionService(require('../models/subscription'), require('../models/cow'))

async function createSubscription (ctx) {
  ctx.body = await subscriptionService.createSubscription(ctx.request.fields)
}

async function listSubscriptions (ctx) {
  ctx.body = await subscriptionService.listSubscriptions()
}

async function getSubscriptionById (ctx) {
  ctx.body = await subscriptionService.findSubscription(Number(ctx.params.subscriptionId))
}

async function updateSubscription (ctx) {
  await subscriptionService.updateSubscription(Number(ctx.params.subscriptionId))
}

async function updateSubscriptionNodes (ctx) {
  await subscriptionService.updateSubscriptionNodes(Number(ctx.params.subscriptionId))
  ctx.response.status = 200
}

async function removeSubscription (ctx) {
  await subscriptionService.removeSubscription(Number(ctx.params.subscriptionId))
}

module.exports = {
  createSubscription,
  listSubscriptions,
  getSubscriptionById,
  updateSubscription,
  updateSubscriptionNodes,
  removeSubscription
}
