const fs = require('fs')
const path = require('path')
const promisify = require('../utils/promisify')
const writeFileQuietly = require('../utils/write-file-quietly')

const readFile = promisify.forFunc(fs.readFile)

class PersistedJson {
  constructor (path) {
    this.path = path
  }

  async load (fallback) {
    let data
    try {
      const json = await readFile(this.path, { encoding: 'utf8' })
      data = JSON.parse(json)
    } catch (ignored) {
      data = fallback
    }
    return data
  }

  async save (data) {
    await writeFileQuietly(this.path, JSON.stringify(data), { encoding: 'utf8' })
  }
}

class JsonStore {
  constructor (directory) {
    this.directory = directory
  }

  build (name) {
    return new PersistedJson(path.resolve(this.directory, `${name}.json`))
  }
}

const store = new JsonStore(path.resolve(__dirname, '../../data/json-store'))

module.exports = store
