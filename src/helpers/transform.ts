import { AxiosTransform } from '../types/index'

export default function transform(
  data: any,
  headers: any,
  fns: AxiosTransform | AxiosTransform[]
): any {
  if (typeof fns === 'undefined') {
    return data
  }

  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
