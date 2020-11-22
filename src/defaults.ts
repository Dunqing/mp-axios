import miniprogram from './adapters/miniprogram'
import xhr from './adapters/xhr'
import { transformRequest, transformResponse } from './helpers/data'
import processHeader from './helpers/header'
import { AxiosAdapter, AxiosRequestConfig } from './types'

const selectAdapter = function(): AxiosAdapter | undefined {
  if (typeof XMLHttpRequest !== 'undefined') {
    return xhr
  } else if (typeof uni !== 'undefined' || typeof wx !== 'undefined') {
    return miniprogram as AxiosAdapter
  }
  throw new Error('没有适合你环境的适配器！请自己实现一个进行适配！')
}

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
  adapter: selectAdapter(),
  validateStatus(status: number) {
    return status >= 200 && status <= 300
  },
  transformResponse: [
    function(data: any) {
      return transformResponse(data)
    }
  ],
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const noDataMethodKey = ['delete', 'get', 'head', 'options']
noDataMethodKey.forEach(method => {
  config.headers[method] = {}
})

const dataMethodKey = ['patch', 'post', 'put']
dataMethodKey.forEach(method => {
  config.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

export default config
