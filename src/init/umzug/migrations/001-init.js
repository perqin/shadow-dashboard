module.exports = {
  up: async function (queryInterface, DataTypes) {
    await queryInterface.createTable('subscriptions', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      url: { type: DataTypes.CHAR },
      newNodeEnabled: { type: DataTypes.BOOLEAN }
    })
    await queryInterface.createTable('nodes', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      subscriptionId: { type: DataTypes.INTEGER, references: { model: 'subscriptions' } },
      enabled: { type: DataTypes.BOOLEAN },
      // `ss` for Shadowsocks, `ssr` for ShadowsocksR and its derivatives
      type: { type: DataTypes.CHAR },
      server: { type: DataTypes.CHAR },
      localAddress: { type: DataTypes.CHAR },
      localPort: { type: DataTypes.INTEGER, unique: true },
      serverPort: { type: DataTypes.INTEGER },
      password: { type: DataTypes.CHAR },
      method: { type: DataTypes.CHAR },
      // Only for `ss`
      plugin: { type: DataTypes.CHAR },
      // Only for `ssr`
      obfs: { type: DataTypes.CHAR },
      obfsParam: { type: DataTypes.CHAR },
      protocol: { type: DataTypes.CHAR },
      protocolParam: { type: DataTypes.CHAR },
      remarks: { type: DataTypes.CHAR }
    })
  },
  down: async function () {
    throw new Error('Down migration is not supported')
  }
}
