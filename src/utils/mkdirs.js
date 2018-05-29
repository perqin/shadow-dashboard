const path = require('path')
const fs = require('fs')
const promisify = require('./promisify')

const access = promisify.forFunc(fs.access)
const mkdir = promisify.forFunc(fs.mkdir)

async function mkdirs (dir) {
  // Create parent directory if needed
  const parent = path.dirname(dir)
  try {
    await access(parent)
  } catch (ignored) {
    await mkdirs(parent)
  }
  // Create current directory if needed
  try {
    await access(dir)
  } catch (ignored) {
    await mkdir(dir)
  }
}

module.exports = mkdirs
