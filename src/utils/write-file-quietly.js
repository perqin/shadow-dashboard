const fs = require('fs')
const path = require('path')
const promisify = require('./promisify')
const mkdirs = require('./mkdirs')

const writeFile = promisify.forFunc(fs.writeFile)

module.exports = async function (file, content) {
  // Ensure directory exists
  await mkdirs(path.dirname(file))
  // Write file
  await writeFile(file, content, { encoding: 'utf8' })
}
