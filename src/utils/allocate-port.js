let available = new Array(1000)

module.exports = (min, max, allocated) => {
  const len = max - min + 1
  if (available.length < len) {
    available = new Array(len)
  }
  for (let i = min; i <= max; ++i) {
    available[i - min] = true
  }
  for (let port of allocated) {
    if (port >= min && port <= max) {
      available[port - min] = false
    }
  }
  for (let i = min; i <= max; ++i) {
    if (available[i - min]) {
      return i
    }
  }
  throw new Error('All ports are allocated')
}
