import { isDate, isObject } from './util';

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

export default function buildUrl(url: string, params?: any): string {
  if (!params) {
    return url;
  }
  const parts: string[] = [];

  Object.keys(params).forEach(key => {
    const val = params[key];
    if (val === null || val === undefined) {
      return;
    }
    let values = [];
    if (Array.isArray(val)) {
      values = val;
      key += '[]';
    } else {
      values = [val];
    }

    values.forEach(value => {
      if (isDate(value)) {
        value = value.toISOString();
      } else if (isObject(value)) {
        value = JSON.stringify(value);
      }
      parts.push(`${encode(key)}=${encode(value)}`);
    });
  });

  const serializedParams = parts.join('&');
  if (serializedParams) {
    const markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  return url;
}
