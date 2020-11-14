import { createError } from '../helpers/error';
import { parseHeaders } from '../helpers/header';
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types/index';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, timeout } = config;
    const request = new XMLHttpRequest();
    request.open(method.toUpperCase(), url!, true);

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    });

    function handleResponse(response: AxiosResponse) {
      const { status } = response;
      if (status >= 200 && status <= 300) {
        resolve(response);
      } else {
        reject(createError(`request fail with status code ${status}`, config));
      }
    }

    if (config.responseType) {
      request.responseType = config.responseType;
    }

    if (timeout) {
      request.timeout = timeout;
    }

    request.ontimeout = function () {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request));
    };

    request.onerror = function () {
      reject(createError('Network error', config, null, request));
    };

    request.onreadystatechange = function () {
      if (request.readyState !== 4) {
        return;
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders());

      const response: AxiosResponse = {
        data: config.responseType === 'text' ? request.responseText : request.response,
        status: request.status,
        statusText: request.statusText,
        config,
        headers: responseHeaders,
        request,
      };
      handleResponse(response);
    };
    request.send(data);
  });
}
