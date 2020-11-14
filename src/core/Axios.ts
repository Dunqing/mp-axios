import { AxiosPromise, AxiosRequestConfig, RequestMethod } from '../types/index';
import dispatchRequest from './dispatchRequest';

export default class Axios {
  request(config: AxiosRequestConfig): AxiosPromise {
    return dispatchRequest(config);
  }
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData(url, RequestMethod.get, config);
  }
  post(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData(url, RequestMethod.post, data, config);
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData(url, RequestMethod.options, config);
  }
  put(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData(url, RequestMethod.put, config);
  }
  patch(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData(url, RequestMethod.patch, config);
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData(url, RequestMethod.head, config);
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData(url, RequestMethod.delete, config);
  }

  private _requestMethodWithoutData(
    url: string,
    method: RequestMethod,
    config?: AxiosRequestConfig,
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
      }),
    );
  }

  private _requestMethodWithData(
    url: string,
    method: RequestMethod,
    data: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        data,
        method,
        url,
      }),
    );
  }
}
