class SettingService {
  constructor (Cow) {
    this.Cow = Cow
  }

  async getSettingByName (name) {
    if (name === 'cow') {
      return this.Cow.getConfig()
    } else {
      throw new Error(`Unsupported setting: ${name}`)
    }
  }

  async updateSettingByName (name, config) {
    if (name === 'cow') {
      return this.Cow.updateConfig(config)
    } else {
      throw new Error(`Unsupported setting: ${name}`)
    }
  }
}

module.exports = SettingService
