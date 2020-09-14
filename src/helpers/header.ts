import { isObject } from './util'

function normilizeHeaderName(headers: any, nromilizedName: string) {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== nromilizedName && nromilizedName.toUpperCase() === name.toUpperCase()) {
      headers[nromilizedName] = headers[name]
      delete headers[name]
    }
  })
}

export default function processHeader(headers: any, data: any) {
  normilizeHeaderName(headers, 'Content-Type')
  if (isObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'appliction/json;charset=utf-8'
    }
  }
}
