class SubscriptionService {
  constructor (Subscription, Cow) {
    this.Subscription = Subscription
    this.Cow = Cow
  }

  async createSubscription (data) {
    return this.Subscription.create(data)
  }

  async listSubscriptions () {
    return this.Subscription.findAll()
  }

  async findSubscription (id) {
    return this.Subscription.findById(id, { rejectOnEmpty: true })
  }

  async updateSubscription (id, data) {
    await this.Subscription.update(data, {
      where: { id: id },
      rejectOnEmpty: true
    })
  }

  async updateSubscriptionNodes (id) {
    const subscription = await this.Subscription.findById(id, { rejectOnEmpty: true })
    await subscription.updateNodes()
    await this.Cow.restart()
  }

  async removeSubscription (id) {
    await this.Subscription.destroy({
      where: { id: id },
      rejectOnEmpty: true
    })
  }
}

module.exports = SubscriptionService
