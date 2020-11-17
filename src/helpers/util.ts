export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function isFormData(val: any): val is FormData {
  return val !== 'undefined' && val instanceof FormData
}

export function isFunction(val: any): val is Function {
  return toString.call(val) === '[object Function]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    console.log('key: ', key)
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...rest: any[]): any {
  const result: any = {}
  rest.forEach(obj => {
    Object.keys(obj).forEach(key => {
      const current = obj[key]

      if (isObject(current)) {
        if (isObject(result[key])) {
          result[key] = deepMerge(result[key], current)
        } else {
          result[key] = deepMerge(current)
        }
      } else if (Array.isArray(current)) {
        if (Array.isArray(result[key])) {
          result[key] = result[key].concat(current)
        } else {
          result[key] = current
        }
      }
      result[key] = obj[key]
    })
  })
  return result
}
