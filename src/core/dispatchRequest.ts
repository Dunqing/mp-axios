import { flattenHeaders } from '../helpers/header'
import transform from '../helpers/transform'
import buildUrl from '../helpers/url'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'

/**
 * 触发请求
 * @param config
 */
export default function dispatchRequest(
  config: AxiosRequestConfig
): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

/**
 * 处理config
 * @param config
 */
function processConfig(config: AxiosRequestConfig): void {
  // eslint-disable-next-line no-param-reassign
  config.url = transformURL(config)
  // eslint-disable-next-line no-param-reassign
  config.data = transform(config.data, config.headers, config.transformRequest)
  // eslint-disable-next-line no-param-reassign
  config.headers = flattenHeaders(config.headers, config.method!)
}

/**
 * 转换 url地址
 * @param config
 */
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}

/**
 * 转换响应的data
 * @param res
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
