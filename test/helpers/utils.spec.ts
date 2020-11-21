/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import {
  combineURL,
  deepMerge,
  extend,
  isAbsoluteURL,
  isDate,
  isFunction,
  isObject,
  isURLSearchParams
} from '../../src/helpers/util'

describe('helpers::utils', () => {
  let result: any
  it('should is Date', () => {
    result = isDate(new Date())
    expect(result).toBeTruthy()
    result = isDate(Date.now())
    expect(result).toBeFalsy()
  })

  it('should is Object', () => {
    result = isObject({})
    expect(result).toBeTruthy()
    const result1 = isObject(Object.create(null))
    expect(result1).toBeTruthy()
    result = isObject(new Date())
    expect(result).toBeFalsy()
  })

  it('should is Function', () => {
    result = isFunction(() => {})
    expect(result).toBeTruthy()
    result = isFunction(function() {})
    expect(result).toBeTruthy()
    result = function() {}
    expect(result).toBeTruthy()
  })

  it('should is URLSearchParams', () => {
    const result: any = isURLSearchParams(new URLSearchParams())
    expect(result).toBeTruthy()
  })

  it('should is absolute url', () => {
    result = isAbsoluteURL('file://127.0.0.1')
    expect(result).toBeTruthy()
    result = isAbsoluteURL('https://127.0.0.1')
    expect(result).toBeTruthy()
    result = isAbsoluteURL('msg/test')
    expect(result).toBeFalsy()
  })

  it('combine url', () => {
    result = combineURL('http://127.0.0.1/', '/hello')
    expect(result).toBe('http://127.0.0.1/hello')
    result = combineURL('http://127.0.0.1//', '//hello')
    expect(result).toBe('http://127.0.0.1/hello')
    result = combineURL('http://127.0.0.1//', 'est/hello')
    expect(result).toBe('http://127.0.0.1/est/hello')
  })

  it('extend class', () => {
    class TestClass {
      constructor() {}

      hello() {}

      world() {}
    }

    class TestClass2 {
      constructor() {}
      request() {}
    }
    result = Object.getOwnPropertyNames(TestClass.prototype)
    expect(result).toContain('hello')
    result = Object.getOwnPropertyNames(TestClass2.prototype)
    expect(result).toContain('request')
    class Zero {}
    result = new Zero()
    const t1 = new TestClass()
    const t2 = new TestClass2()
    extend(result, TestClass.prototype)
    extend(result, TestClass2.prototype, result)
    expect(result).toHaveProperty('request', result.request)
    expect(result).not.toHaveProperty('request', t2.request)
    expect(result).toHaveProperty('hello', t1.hello)
    expect(result).not.toHaveProperty('request', result.hello)
  })

  it('deep merge [object, array]', () => {
    const config1 = {
      a: 1,
      b: [2],
      c: { c: 3, d: 6 },
      e: 7
    }
    result = deepMerge(config1)
    expect(result).toEqual(config1)
    const config2 = {
      a: 2,
      b: [3],
      c: { a: 2, c: 4 },
      d: 456
    }
    result = deepMerge(config1, config2)
    expect(result).toEqual({
      a: 2,
      b: [2, 3],
      c: { a: 2, c: 4, d: 6 },
      d: 456,
      e: 7
    })
  })
})
