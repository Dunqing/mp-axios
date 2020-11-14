import { isObject } from './util';

function normalizeHeaderName(headers: any, normalizedName: string) {
  if (!headers) {
    return;
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && normalizedName.toUpperCase() === name.toUpperCase()) {
      headers[normalizedName] = headers[name];
      delete headers[name];
    }
  });
}

export default function processHeader(headers: any, data: any) {
  normalizeHeaderName(headers, 'Content-Type');
  if (isObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8';
    }
  }
  return headers;
}

export function parseHeaders(headers?: string) {
  const parsed = Object.create(null);
  if (!headers) {
    return parsed;
  }

  headers.split('\r\n').forEach((line) => {
    let [key, val] = line.split(':');
    key = key.trim().toLowerCase();

    if (!key) {
      return;
    }
    if (val) {
      val = val.trim();
    }
    parsed[key] = val;
  });

  return parsed;
}