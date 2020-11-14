import { isArray } from 'util';
import { AxiosTransform } from '../types/index';

export default function transform(data: any, headers: any, fns: AxiosTransform | AxiosTransform[]) {
  if (!fns) {
    return data;
  }

  if (!isArray(fns)) {
    fns = [fns];
  }

  fns.forEach((fn) => {
    data = fn(data, headers);
  });

  return data;
}
