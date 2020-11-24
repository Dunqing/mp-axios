import { AxiosPromise, AxiosRequestConfig } from '../types/index'

let MPRequest: any = null

if (typeof uni !== 'undefined' && typeof uni.request !== 'undefined') {
  MPRequest = uni.request
} else if (typeof wx !== 'undefined' && typeof wx.request !== 'undefined') {
  MPRequest = uni.request
}

type MPRequestConfigKeys =
  | 'baseURL'
  | 'url'
  | 'method'
  | 'data'
  | 'params'
  | 'headers'
  | 'timeout'
  | 'adapter'
  | 'paramsSerialize'
  | 'transformRequest'
  | 'transformResponse'
  | 'validateStatus'

interface RequestConfig {
  responseType: 'text' | 'arrayBuffer'
  dataType: 'json' | any
  enableHttp2: boolean
  enableQuic: boolean
  enableCache: boolean
}

export type MPRequestConfig = Pick<AxiosRequestConfig, MPRequestConfigKeys> &
  RequestConfig

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  config: MPRequestConfig
  headers: any
  request: any
  profile: {
    [propName: string]: any
  }
}

function settled(resolve: any, reject: any, response: AxiosResponse): void {
  if (response.config.validateStatus?.(response.status) === true) {
    resolve(response)
  } else {
    reject(
      createError(
        response.statusText,
        response.config,
        'ERROR',
        response.request,
        response
      )
    )
  }
}

export function createError(
  message: string,
  config: MPRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse,
  isAxiosError?: boolean
): AxiosError {
  const error = new AxiosError(
    config,
    isAxiosError,
    code,
    request,
    response,
    message
  )
  return error
}

export class AxiosError extends Error {
  constructor(
    public config: MPRequestConfig,
    public isAxiosError?: boolean,
    public code?: string | null,
    public request?: any,
    public response?: AxiosResponse,
    message?: string
  ) {
    super(message)
  }
}

export default async function(config: MPRequestConfig): AxiosPromise {
  return await new Promise((resolve, reject) => {
    const request = MPRequest({
      ...config,
      complete(res: any) {
        const response = {
          data: res.data,
          status: res.statusCode,
          statusText: res.errMsg,
          config: config,
          headers: res.headers,
          profile: res.profile,
          request
        }
        settled(resolve, reject, response)
      }
    })
  })
}
