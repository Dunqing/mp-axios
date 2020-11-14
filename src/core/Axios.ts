import { AxiosPromise, AxiosRequestConfig, AxiosResponse, RejectedFn, RequestMethod, ResolvedFn } from '../types/index';
import { InterceptorManager } from './AxiosInterceptor';
import dispatchRequest from './dispatchRequest';
import mergeConfig from './mergeConfig';

interface AxiosInterceptors {
  request: InterceptorManager<AxiosRequestConfig>;
  response: InterceptorManager<AxiosResponse>;
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise);
  rejected?: RejectedFn;
}

export default class Axios {
  interceptors: AxiosInterceptors;
  defaults: AxiosRequestConfig;

  constructor(config: AxiosRequestConfig) {
    this.defaults = config;
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>(),
    };
  }

  request(url: string, config?: AxiosRequestConfig): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {};
      }
      config.url = url;
    } else {
      config = url;
    }

    config = mergeConfig(this.defaults, config);

    const chain: Array<PromiseChain<any>> = [{
      resolved: dispatchRequest,
      rejected: undefined,
    }];

    let promise = Promise.resolve(config);

    this.interceptors.request.forEach((interceptor) => {
      chain.unshift(interceptor);
    });

    this.interceptors.response.forEach((interceptor) => {
      chain.push(interceptor);
    });

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!;
      promise = promise.then(resolved, rejected);
    }

    return promise as AxiosPromise;
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
