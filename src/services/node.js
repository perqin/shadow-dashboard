const arrayUtils = require('../utils/array-utils')

class NodeService {
  constructor (Node, Cow) {
    this.Node = Node
    this.Cow = Cow
  }

  async getConfig () {
    return this.Node.jsonConfig.file
  }

  async updateConfig (config) {
    this.Node.jsonConfig.file = { ...this.Node.jsonConfig.file, ...config }
  }

  async createNode (data) {
    const node = await this.Node.create(data)
    // Start node client if needed
    if (node.enabled) {
      await node.start()
      arrayUtils.addIfNotExists(this.Cow.jsonConfig.memory.proxies, node.getProxy())
      await this.Cow.reload()
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
        arrayUtils.addIfNotExists(this.Cow.jsonConfig.memory.proxies, node.getProxy())
        await this.Cow.reload()
      } else {
        await node.stop()
        arrayUtils.removeIfExists(this.Cow.jsonConfig.memory.proxies, node.getProxy())
        await this.Cow.reload()
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
