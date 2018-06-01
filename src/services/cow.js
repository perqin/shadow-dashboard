class CowService {
  constructor (Cow) {
    this.Cow = Cow
  }

  async getConfig () {
    return this.Cow.jsonConfig.file
  }

  async updateConfig (config) {
    this.Cow.jsonConfig.file = { ...this.Cow.jsonConfig.file, ...config }
    await this.Cow.reload()
  }
}

module.exports = CowService
