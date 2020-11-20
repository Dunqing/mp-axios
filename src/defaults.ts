import { transformRequest, transformResponse } from './helpers/data'
import processHeader from './helpers/header'
import { AxiosRequestConfig } from './types'

const config: AxiosRequestConfig = {
  // 默认不超时
  timeout: 0,
  xsrfCookieName: 'X-TOKEN',
  xsrfHeaderName: 'X-TOKEN',
  transformRequest: [
    function(data: any, headers: any) {
      processHeader(headers, data)
      return transformRequest(data)
    }
  ],
  validateStatus(status: number) {
    return status >= 200 && status <= 300
  },
  transformResponse: [
    function(data: any) {
      return transformResponse(data)
    }
  ],
  headers: {
    common: {}
  }
}

const noDataMethodKey = ['delete', 'get', 'head', 'options']
noDataMethodKey.forEach(method => {
  config.headers[method] = {
    Accept: 'application/json, text/plain, */*'
  }
})

const dataMethodKey = ['patch', 'post', 'put']
dataMethodKey.forEach(method => {
  config.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

export default config
