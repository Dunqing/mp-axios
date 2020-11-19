import { flattenHeaders } from '../helpers/header'
import transform from '../helpers/transform'
import buildUrl from '../helpers/url'
import { combineUrl, isAbsoluteUrl } from '../helpers/util'
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
  // eslint-disable-next-line no-param-reassign
  config.url = transformURL(config)
  // eslint-disable-next-line no-param-reassign
  config.data = transform(
    config.data,
    config.headers,
    config.transformRequest ?? []
  )
  // eslint-disable-next-line no-param-reassign
  config.headers = flattenHeaders(config.headers, config.method!)
}

/**
 * 转换 url地址
 * @param config
 */
function transformURL(config: AxiosRequestConfig): string {
  let { baseUrl, url, params, paramsSerialize } = config
  console.log(url, !isAbsoluteUrl(url!))
  if (typeof baseUrl === 'string' && !isAbsoluteUrl(url!)) {
    url = combineUrl(baseUrl, url)
    console.log('url: ', url)
  }

  return buildUrl(url!, params, paramsSerialize)
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
