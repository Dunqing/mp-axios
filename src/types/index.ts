export type Method =
  | 'GET'
  | 'get'
  | 'POST'
  | 'post'
  | 'options'
  | 'OPTIONS'
  | 'PUT'
  | 'put'
  | 'DELETE'
  | 'delete'
  | 'HEAD'
  | 'head'

export interface AxiosRequestConfig {
  url: string
  method: Method
  data?: any
  params?: any
  headers?: any
}
