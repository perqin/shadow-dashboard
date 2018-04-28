const promisify = require('../promisify')

describe('promisify', () => {
  function Journalist (name) {
    this.name = name
  }

  Journalist.prototype.run = function (speed, callback) {
    setTimeout(() => {
      callback(null, {
        thisObj: this,
        name: this.name,
        speed: speed
      })
    }, 1000)
  }

  test('forFunc', async () => {
    const name = 'Baohua Zhang'
    const speed = 30000000000
    const wj = new Journalist(name)
    const fn = promisify.forFunc(wj.run, wj)
    const result = await fn(speed)
    expect(result.thisObj).toBe(wj)
    expect(result.name).toBe(name)
    expect(result.speed).toBe(speed)
    const speed2 = 1
    const another = new Journalist('western')
    const fn2 = promisify.forFunc(wj.run, another)
    const result2 = await fn2(speed2)
    expect(result2.thisObj).toBe(another)
    expect(result2.name).toBe('western')
    expect(result2.speed).toBe(speed2)
  })

  test('forObject', async () => {
    const name = 'Baohua Zhang'
    const speed = 30000000000
    const owj = new Journalist(name)
    const wj = promisify.forObject(owj)
    const result = await wj.runAsync(speed)
    expect(wj).toBe(owj)
    expect(result.thisObj).toBe(owj)
    expect(result.name).toBe(name)
    expect(result.speed).toBe(speed)
  })
})
