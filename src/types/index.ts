import Cancel from '../cancel/Cancel'
import { CancelTokenInstance, CancelTokenStatic } from './CancelToken'

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
  CONNECT = 'CONNECT',
  connect = 'connect',
  TRACE = 'TRACE',
  trace = 'trace'
}
export type Method = keyof typeof RequestMethod

export type AxiosTransform = (data: any, headers?: any) => any

export type ParamsSerialize = (params: any) => string

export type AxiosAdapter = (config: AxiosRequestConfig) => AxiosPromise
export interface AxiosRequestConfig {
  baseURL?: string
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  adapter?: AxiosAdapter
  withCredentials?: boolean
  xsrfHeaderName?: string
  xsrfCookieName?: string
  paramsSerialize?: ParamsSerialize
  // 监听下载
  onDownloadProgress?: (e: ProgressEvent) => void
  // 监听上传
  onUploadProgress?: (e: ProgressEvent) => void
  // 校验validateStatus
  validateStatus?: (status: number) => boolean
  // HTTP协议中的 Authorization
  auth?: AxiosAuthBasic
  transformRequest?: AxiosTransform | AxiosTransform[]
  transformResponse?: AxiosTransform | AxiosTransform[]
  CancelToken?: CancelTokenInstance
  [propName: string]: any
}

interface AxiosAuthBasic {
  username: string
  password: string
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
  request: AxiosRequestFunction
  get: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>
  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => AxiosPromise<T>
  delete: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>
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
  getUri: (config: AxiosRequestConfig) => string
}

export type RejectedFn = (error: any) => any
export type ResolvedFn<T> = (val: T) => T | Promise<T>

export interface AxiosInterceptorsManager<T> {
  use: (resolved: ResolvedFn<T>, rejected?: RejectedFn) => number
  eject: (id: number) => boolean
}

interface AxiosRequestFunction {
  <T = any>(url: string, config?: any): AxiosPromise<T>
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios, AxiosRequestFunction {}

export type AxiosClassStatic = new (config: AxiosRequestConfig) => Axios

export interface AxiosStatic extends AxiosInstance {
  CancelToken: CancelTokenStatic
  Cancel: Cancel
  isCancel: (value: any) => boolean
  create: (config?: AxiosRequestConfig) => AxiosInstance
  all: <T>(promise: Array<T | Promise<T>>) => Promise<T[]>
  spread: <T, R>(callback: (...args: T[]) => R) => (arr: T[]) => R
  Axios: AxiosClassStatic
}
