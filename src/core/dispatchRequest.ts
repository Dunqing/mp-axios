import { flattenHeaders } from '../helpers/header'
import transform from '../helpers/transform'
import { transformURL } from '../helpers/url'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'

/**
 * 触发请求
 * @param config
 */
export default async function dispatchRequest(
  config: AxiosRequestConfig
): AxiosPromise {
  throwIfCancellationRequested(config)

  processConfig(config)
  const res = await xhr(config)
  return transformResponseData(res)
}

/**
 * 处理config
 * @param config
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(
    config.data,
    config.headers,
    config.transformRequest ?? []
  )
  config.headers = flattenHeaders(config.headers, config.method!)
}

/**
 * 转换响应的data
 * @param res
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(
    res.data,
    res.headers,
    res.config.transformResponse ?? []
  )
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (typeof config.CancelToken !== 'undefined') {
    config.CancelToken.throwIfRequested()
  }
}
