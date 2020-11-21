let MPRequest: any = null

if (typeof uni !== 'undefined' && typeof uni.request !== 'undefined') {
  MPRequest = uni.request
} else if (typeof wx !== 'undefined' && typeof wx.request !== 'undefined') {
  MPRequest = uni.request
}

type AxiosRequestConfig = any

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  config: AxiosRequestConfig
  headers: any
  request: any
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
  config: AxiosRequestConfig,
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
    public config: AxiosRequestConfig,
    public isAxiosError?: boolean,
    public code?: string | null,
    public request?: any,
    public response?: AxiosResponse,
    message?: string
  ) {
    super(message)
  }
}

export default async function(config: AxiosRequestConfig): Promise<any> {
  return await new Promise((resolve, reject) => {
    console.log('config: ', config)
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
