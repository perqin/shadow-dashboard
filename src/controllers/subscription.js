const Subscription = require('../models/subscription')

async function listSubscriptions (ctx) {
  ctx.body = await Subscription.findAll()
}

async function createSubscription (ctx) {
  ctx.body = await Subscription.create(ctx.request.fields)
}

async function updateSubscriptionNodes (ctx) {
  const subscription = await Subscription.findById(ctx.params.subscriptionId, { rejectOnEmpty: true })
  await subscription.updateNodes()
  ctx.response.status = 200
}

module.exports = {
  listSubscriptions,
  createSubscription,
  updateSubscriptionNodes
}
