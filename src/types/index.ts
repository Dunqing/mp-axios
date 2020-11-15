// eslint-disable-next-line no-shadow
export enum RequestMethod {
  GET = 'GET',
  get = 'get',
  POST = 'POST',
  post = 'post',
  options = 'options',
  OPTIONS = 'OPTIONS',
  PUT = 'PUT',
  put = 'put',
  DELETE = 'DELETE',
  delete = 'delete',
  HEAD = 'HEAD',
  head = 'head',
  patch = 'patch',
  PATCH = 'PATCH',
}
export type Method = keyof typeof RequestMethod

export interface AxiosTransform {
  (data: any, headers?: any): any
}

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransform | AxiosTransform[]
  transformResponse?: AxiosTransform | AxiosTransform[]
  [propName: string]: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  config: AxiosRequestConfig
  headers: any
  request: any
}

export interface AxiosError {
  isAxiosError?: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export type AxiosPromise<T = any> = Promise<AxiosResponse<T>>

export interface AxiosInterceptors {
  request: AxiosInterceptorsManager<AxiosRequestConfig>
  response: AxiosInterceptorsManager<AxiosResponse>
}

export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: AxiosInterceptors
  request: <T = any>(config: AxiosRequestConfig) => AxiosPromise<T>
  get: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => AxiosPromise<T>
  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => AxiosPromise<T>
  delete: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => AxiosPromise<T>
  patch: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => AxiosPromise<T>
  options: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ) => AxiosPromise<T>
  head: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => AxiosPromise<T>
}

export interface RejectedFn {
  (error: any): any
}
export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface AxiosInterceptorsManager<T> {
  use: (resolved: ResolvedFn<T>, rejected?: RejectedFn) => number
  eject: (id: number) => boolean
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: any): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create: (config?: AxiosRequestConfig) => AxiosInstance
}
