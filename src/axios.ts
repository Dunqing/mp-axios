import { isCancel } from './cancel/Cancel'
import { CancelToken } from './cancel/CancelToken'
import Axios from './core/Axios'
import mergeConfig from './core/mergeConfig'
import defaults from './defaults'
import { extend } from './helpers/util'
import { AxiosRequestConfig, AxiosStatic } from './types'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, Axios.prototype, context)
  extend(instance, context)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = config => {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.isCancel = isCancel
axios.Axios = Axios
axios.all = async function<T>(promise: Array<T | Promise<T>>): Promise<T[]> {
  return await Promise.all(promise)
}

axios.spread = function<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R {
  return function wrap(arr: T[]) {
    return callback.apply(null, arr)
  }
}

export default axios
