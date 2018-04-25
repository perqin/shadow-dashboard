const promisify = require('../promisify')

describe('promisify', () => {
  function WesternJournalist (name) {
    this.name = name
  }

  WesternJournalist.prototype.run = function (speed, callback) {
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
    const wj = new WesternJournalist(name)
    const fn = promisify.forFunc(wj.run, wj)
    const result = await fn(speed)
    expect(result.thisObj).toBe(wj)
    expect(result.name).toBe(name)
    expect(result.speed).toBe(speed)
    const another = new WesternJournalist('another')
    const fn2 = promisify.forFunc(wj.run, another)
    const result2 = await fn2(speed)
    expect(result2.thisObj).toBe(another)
    expect(result2.name).toBe('another')
    expect(result2.speed).toBe(speed)
  })

  test('forObject: not hide', async () => {
    const name = 'Baohua Zhang'
    const speed = 30000000000
    const owj = new WesternJournalist(name)
    const wj = promisify.forObject(owj)
    const result = await wj.runAsync(speed)
    expect(wj).toBe(owj)
    expect(result.thisObj).toBe(owj)
    expect(result.name).toBe(name)
    expect(result.speed).toBe(speed)
  })

  test('forObject: hide', async () => {
    const name = 'Baohua Zhang'
    const speed = 30000000000
    const owj = new WesternJournalist(name)
    const wj = promisify.forObject(owj, true)
    const result = await wj.run(speed)
    expect(wj).toBe(owj)
    expect(result.thisObj).toBe(owj)
    expect(result.name).toBe(name)
    expect(result.speed).toBe(speed)
  })
})
