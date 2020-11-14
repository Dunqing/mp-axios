import { isArray } from 'util';

const { toString } = Object.prototype;

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]';
}

export function isObject(val: any): val is Object {
  return toString.call(val) === '[object Object]';
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any;
  }
  return to as T & U;
}

export function deepMerge(...rest: any[]) {
  const result: any = {};
  rest.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      const current = obj[key];

      if (isObject(current)) {
        if (isObject(result[key])) {
          result[key] = deepMerge(result[key], current);
        } else {
          result[key] = deepMerge(current);
        }
      } else if (isArray(current)) {
        if (isArray(result[key])) {
          result[key] = result[key].concat(current);
        } else {
          result[key] = current;
        }
      }
      result[key] = obj[key];
    });
  });
  return result;
}
