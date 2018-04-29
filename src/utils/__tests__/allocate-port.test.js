const allocatePort = require('../allocate-port')

describe('allocatePort', () => {
  test('should allocate', () => {
    const min = 100
    const max = 110
    const allocated = [100, 101, 102]
    const result = allocatePort(min, max, allocated)
    expect(result).toBe(103)
  })

  test('should allocate from min', () => {
    const min = 100
    const max = 110
    const allocated = [101, 102]
    const result = allocatePort(min, max, allocated)
    expect(result).toBe(100)
  })

  test('should be called multiple times', () => {
    const min = 100
    const max = 110
    const allocated = [101, 102]
    const result = allocatePort(min, max, allocated)
    const min1 = 110
    const max1 = 120
    const allocated1 = [111, 112, 113]
    const result1 = allocatePort(min1, max1, allocated1)
    expect(result).toBe(100)
    expect(result1).toBe(110)
  })

  test('should fail when all ports are allocated', () => {
    const min = 100
    const max = 105
    const allocated = [100, 101, 102, 103, 104, 105]
    expect(() => {
      allocatePort(min, max, allocated)
    }).toThrow()
  })
})
