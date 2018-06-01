function addIfNotExists (arr, item) {
  const index = arr.findIndex(a => a === item)
  if (index === -1) {
    arr.push(item)
  }
}

function removeIfExists (arr, item) {
  const index = arr.findIndex(a => a === item)
  if (index !== -1) {
    arr.splice(index, 1)
  }
}

module.exports = {
  addIfNotExists,
  removeIfExists
}
