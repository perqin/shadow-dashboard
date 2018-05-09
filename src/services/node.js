class NodeService {
  constructor (Node, Cow) {
    this.Node = Node
    this.Cow = Cow
  }

  async createNode (data) {
    const node = await this.Node.create(data)
    // Start node client if needed
    if (node.enabled) {
      await node.start()
      await this.Cow.addProxy(node.getProxy())
    }
    return node
  }

  async listNodes () {
    return this.Node.findAll()
  }

  async findNode (id) {
    return this.Node.findById(id, { rejectOnEmpty: true })
  }

  async updateNode (id, data) {
    // `enabled` can only be changed by `updateNodeEnabled`
    delete data.enabled
    await this.Node.update(data, {
      where: { id: id },
      rejectOnEmpty: true
    })
  }

  async updateNodeEnabled (id, enabled) {
    const node = await this.Node.findById(id, { rejectOnEmpty: true })
    if (node.enabled !== enabled) {
      await node.update({ enabled: enabled })
      if (enabled) {
        await node.start()
        await this.Cow.addProxy(node.getProxy())
      } else {
        await node.stop()
        await this.Cow.removeProxy(node.getProxy())
      }
    }
  }

  async removeNode (id) {
    await this.Node.destroy({
      where: { id: id },
      rejectOnEmpty: true
    })
  }
}

module.exports = NodeService
