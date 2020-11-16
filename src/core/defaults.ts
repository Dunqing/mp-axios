import { transformRequest, transformResponse } from '../helpers/data'
import processHeader from '../helpers/header'
import { AxiosRequestConfig } from '../types'

const config: AxiosRequestConfig = {
  timeout: 3000,
  transformRequest: [
    function(data: any, headers: any) {
      processHeader(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any) {
      return transformResponse(data)
    }
  ],
  headers: {
    common: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
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
