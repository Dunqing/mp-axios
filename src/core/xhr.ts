import { read } from '../helpers/cookie'
import { createError } from '../helpers/error'
import { parseHeaders } from '../helpers/header'
import isUrlSameOrigin from '../helpers/isUrlSameOrigin'
import { isFormData, isFunction } from '../helpers/util'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import { CancelInstance } from '../types/CancelToken'
import settled from './settled'

export default async function xhr(config: AxiosRequestConfig): AxiosPromise {
  return await new Promise((resolve, reject) => {
    const {
      url,
      method = 'get',
      data = null,
      headers,
      timeout,
      CancelToken,
      withCredentials,
      xsrfHeaderName,
      xsrfCookieName
    } = config

    let request: XMLHttpRequest | null = new XMLHttpRequest()
    request.open(method.toUpperCase(), url!, true)

    // 处理headers相关的
    function processHeaders(): void {
      // csrf must
      const xsrfValue =
        typeof withCredentials === 'boolean' ||
        (isUrlSameOrigin(url!) && typeof xsrfCookieName !== 'undefined')
          ? read(xsrfCookieName ?? '')
          : null

      // add xsrf-token header
      if (typeof xsrfValue === 'string') {
        headers[xsrfHeaderName ?? ''] = xsrfValue
      }

      if (
        typeof config.auth !== 'undefined' &&
        typeof config.auth.password === 'string' &&
        typeof config.auth.username === 'string'
      ) {
        headers.Authorization = `Basic ${btoa(
          config.auth.username + ':' + config.auth.password
        )}`
      }

      Object.keys(headers).forEach(name => {
        if (
          name.toLowerCase() === 'content-type' &&
          (isFormData(data) || data === null)
        ) {
          Reflect.deleteProperty(headers, name)
        } else {
          request!.setRequestHeader(name, headers[name])
        }
      })
    }

    processHeaders()

    if (typeof config.responseType === 'string') {
      request.responseType = config.responseType
    }

    if (typeof withCredentials === 'boolean') {
      request.withCredentials = withCredentials
    }

    if (typeof timeout === 'number') {
      request.timeout = timeout
    }

    if (typeof CancelToken !== 'undefined') {
      if (request === null) {
        return
      }
      CancelToken.promise
        .then((reason?: CancelInstance) => {
          request!.abort()
          reject(reason)
          request = null
        })
        .catch(err => {
          reject(err)
          request = null
        })
    }

    if (isFunction(config.onDownloadProgress)) {
      request.addEventListener('progress', config.onDownloadProgress)
    }

    if (
      isFunction(config.onUploadProgress) &&
      isFunction(request.upload.addEventListener)
    ) {
      request.upload.addEventListener('progress', config.onUploadProgress)
      // request.upload.onprogress = config.onUploadProgress
    }

    request.ontimeout = function() {
      if (request === null) {
        return
      }
      reject(
        createError(
          `Timeout of ${timeout!} ms exceeded`,
          config,
          'ECONNABORTED',
          request
        )
      )
      request = null
    }

    request.onerror = function() {
      if (request === null) {
        return
      }
      reject(createError('Network error', config, null, request))
      request = null
    }

    request.onabort = function() {
      if (request === null) {
        return
      }
      reject(createError('Request aborted', config, 'ECONNABORTED', request))
      request = null
    }

    request.onreadystatechange = function() {
      if (request === null || request.readyState !== 4) {
        return
      }

      // cancelToken 路过
      if (
        request.status === 0 &&
        !(
          request.responseURL === '' &&
          request.responseURL.indexOf('file:') === 0
        )
      ) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())

      const response: AxiosResponse = {
        data:
          config.responseType === 'text'
            ? request.responseText
            : request.response,
        status: request.status,
        statusText: request.statusText,
        config,
        headers: responseHeaders,
        request
      }

      settled(resolve, reject, response)
    }
    request.send(data)
  })
}
