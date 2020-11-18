import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  RejectedFn,
  RequestMethod,
  ResolvedFn
} from '../types'
import { InterceptorManager } from './AxiosInterceptor'
import dispatchRequest from './dispatchRequest'
import mergeConfig from './mergeConfig'

interface AxiosInterceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios {
  interceptors: AxiosInterceptors
  defaults: AxiosRequestConfig

  constructor(config: AxiosRequestConfig) {
    this.defaults = config
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  async request(url: string, config?: AxiosRequestConfig): AxiosPromise {
    if (typeof url === 'string') {
      if (typeof config === 'undefined') {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    const chain: Array<PromiseChain<any>> = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    let promise = Promise.resolve(config)

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    while (chain.length > 0) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise as AxiosPromise
  }

  async get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    console.log(config, 'hello')
    return await this._requestMethodWithoutData(url, RequestMethod.get, config)
  }

  async post(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return await this._requestMethodWithData(
      url,
      RequestMethod.post,
      data,
      config
    )
  }

  async options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return await this._requestMethodWithoutData(
      url,
      RequestMethod.options,
      config
    )
  }

  async put(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return await this._requestMethodWithoutData(url, RequestMethod.put, config)
  }

  async patch(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return await this._requestMethodWithoutData(
      url,
      RequestMethod.patch,
      config
    )
  }

  async head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return await this._requestMethodWithoutData(url, RequestMethod.head, config)
  }

  async delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return await this._requestMethodWithoutData(
      url,
      RequestMethod.delete,
      config
    )
  }

  private async _requestMethodWithoutData(
    url: string,
    method: RequestMethod,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return await this.request(
      Object.assign(config ?? {}, {
        method,
        url
      })
    )
  }

  private async _requestMethodWithData(
    url: string,
    method: RequestMethod,
    data: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return await this.request(
      Object.assign(config ?? {}, {
        data,
        method,
        url
      })
    )
  }
}
