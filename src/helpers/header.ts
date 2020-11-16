import { Method } from '../types'
import { deepMerge, isObject } from './util'

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (typeof headers === 'undefined') {
    return
  }
  Object.keys(headers).forEach(name => {
    if (
      name !== normalizedName &&
      normalizedName.toUpperCase() === name.toUpperCase()
    ) {
      headers[normalizedName] = headers[name]
      Reflect.deleteProperty(headers, name)
    }
  })
}

export default function processHeader(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isObject(data)) {
    if (
      typeof headers !== 'undefined' &&
      typeof headers['Content-Type'] === 'string'
    ) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers?: string): any {
  const parsed = Object.create(null)
  if (typeof headers === 'undefined') {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()

    if (key === '') {
      return
    }
    if (typeof val !== 'undefined') {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (typeof headers === 'undefined') {
    return headers
  }

  headers = deepMerge(
    headers.common,
    headers[method.toLocaleLowerCase()],
    headers
  )
  const headersDeleteKeys = [
    'get',
    'post',
    'head',
    'options',
    'put',
    'patch',
    'delete',
    'common'
  ]

  headersDeleteKeys.forEach(key => {
    Reflect.deleteProperty(headers, key)
  })

  return headers
}
