import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import buildUrl from './helpers/url'
import { buildData } from './helpers/data'

function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transformData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}

function transformData(config: AxiosRequestConfig): string {
  return buildData(config.data)
}

export default axios
