const fs = require('fs')
const path = require('path')
const promisify = require('../utils/promisify')
const writeFileQuietly = require('../utils/write-file-quietly')

const readFile = promisify.forFunc(fs.readFile)
const directory = path.resolve(__dirname, '../../data/json-store')

class JsonConfig {
  constructor (name, file, memory) {
    this.name = name
    this.path = path.resolve(directory, `${this.name}.json`)
    // Will be saved to file
    this.file = file || {}
    // Only keep in memory
    this.memory = memory || {}
  }

  /**
   * If the JSON file doesn't exist, `this.file` will not be overwritten
   */
  async load () {
    try {
      const json = await readFile(this.path, { encoding: 'utf8' })
      this.file = JSON.parse(json)
    } catch (ignored) {}
  }

  async save () {
    await writeFileQuietly(this.path, JSON.stringify(this.file), { encoding: 'utf8' })
  }

  /**
   * Overwrite `this.file` if file exists, save `this.file` back otherwise.
   */
  async loadOrSave () {
    try {
      const json = await readFile(this.path, { encoding: 'utf8' })
      this.file = JSON.parse(json)
    } catch (ignored) {
      this.save()
    }
  }
}

module.exports = JsonConfig
