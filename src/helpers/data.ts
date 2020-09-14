import { isObject } from './util'

export function buildData(data?: any): any {
  if (isObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
