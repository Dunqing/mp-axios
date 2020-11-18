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

export function extend<T extends Object, U extends Object>(
  to: T,
  from: U,
  thisArg?: any
): T & U {
  Object.getOwnPropertyNames(from).forEach(key => {
    if (typeof (to as { [key: string]: any })[key] !== 'undefined') {
      return
    }
    if (typeof thisArg !== 'undefined') {
      ;(to as { [key: string]: any })[key] = isFunction(
        (from as { [key: string]: any })[key]
      )
        ? (from as { [key: string]: any })[key].bind(thisArg)
        : (from as { [key: string]: any })[key]
    } else {
      ;(to as { [key: string]: any })[key] = (from as { [key: string]: any })[
        key
      ]
    }
  })
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
