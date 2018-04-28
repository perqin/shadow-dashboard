function forFunc (fn, thisArg) {
  return function () {
    return new Promise((resolve, reject) => {
      fn.call(thisArg, ...arguments, (err, result) => err ? reject(err) : resolve(result))
    })
  }
}

function forObject (obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'function') {
      obj[`${key}Async`] = forFunc(obj[key], obj)
    }
  }
  return obj
}

module.exports = {
  forFunc,
  forObject
}
