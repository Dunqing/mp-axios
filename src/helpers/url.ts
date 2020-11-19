import { ParamsSerialize } from '../types'
import { isDate, isFunction, isObject, isURLSearchParams } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export default function buildUrl(
  url: string,
  params?: any,
  paramSerialize?: ParamsSerialize
): string {
  if (typeof params === 'undefined') {
    return url
  }

  let serializedParams = ''

  if (isFunction(paramSerialize)) {
    serializedParams = paramSerialize(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    const parts: string[] = []

    Object.keys(params).forEach(key => {
      const val = params[key]
      if (val === null || val === undefined) {
        return
      }
      let values = []
      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }

      values.forEach(value => {
        if (isDate(value)) {
          value = value.toISOString()
        } else if (isObject(value)) {
          value = JSON.stringify(value)
        }
        parts.push(`${encode(key)}=${encode(value)}`)
      })
      serializedParams = parts.join('&')
    })
  }

  if (typeof serializedParams === 'string') {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (!url.includes('?') ? '?' : '&') + serializedParams
  }
  return url
}
