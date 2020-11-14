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
  PATCH = 'PATCH'
}
type Method = keyof typeof RequestMethod;
export interface AxiosRequestConfig {
  url?: string;
  method: Method;
  data?: any;
  params?: any;
  headers?: any;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;
}

export interface AxiosResponse {
  data: any;
  status: number;
  statusText: string;
  config: AxiosRequestConfig;
  headers: any;
}

export interface AxiosError {
  isAxiosError?: boolean;
  config: AxiosRequestConfig;
  code?: string | null;
  request?: any;
  response?: AxiosResponse;
}

export type AxiosPromise = Promise<AxiosResponse>;

export interface Axios {
  request: (config: AxiosRequestConfig) => AxiosPromise;
  get: (url: string, data?: any, config?: AxiosRequestConfig) => AxiosPromise;
  put: (url: string, data?: any, config?: AxiosRequestConfig) => AxiosPromise;
  delete: (url: string, data?: any, config?: AxiosRequestConfig) => AxiosPromise;
  patch: (url: string, data?: any, config?: AxiosRequestConfig) => AxiosPromise;
  options: (url: string, config?: AxiosRequestConfig) => AxiosPromise;
  head: (url: string, config?: AxiosRequestConfig) => AxiosPromise;
  post: (url: string, data?: any, config?: AxiosRequestConfig) => AxiosPromise;
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise;
}
