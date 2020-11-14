import { buildData, transformResponse } from '../helpers/data';
import processHeader from '../helpers/header';
import buildUrl from '../helpers/url';
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types';
import xhr from './xhr';

/**
 * 触发请求
 * @param config
 */
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config).then(res => {
    return transformResponseData(res);
  });
}

/**
 * 处理config
 * @param config
 */
function processConfig(config: AxiosRequestConfig): void {
  // eslint-disable-next-line no-param-reassign
  config.url = transformURL(config);
  // eslint-disable-next-line no-param-reassign
  config.headers = transformHeaders(config);
  // eslint-disable-next-line no-param-reassign
  config.data = transformData(config);
}

/**
 * 转换 url地址
 * @param config
 */
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildUrl(url!, params);
}

/**
 * 转换data
 * @param config
 */
function transformData(config: AxiosRequestConfig): string {
  return buildData(config.data);
}

/**
 * 转换headers
 * @param config
 */
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config;
  return processHeader(headers, data);
}

/**
 * 转换响应的data
 * @param res
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data);
  return res;
}
