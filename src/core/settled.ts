import { createError } from '../helpers/error'
import { AxiosResponse } from '../types'

export default function settled(
  resolve: any,
  reject: any,
  response: AxiosResponse
): void {
  const { status, config, request } = response
  if (request === null) {
    return
  }
  if (config.validateStatus?.(status) === true) {
    resolve(response)
  } else {
    reject(createError(`request fail with status code ${status}`, config))
  }
  response.request = null
}
