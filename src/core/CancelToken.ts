import { CancelTokenInstance } from '../types/CancelToken'

type ResolvePromise = (reason?: string) => void

export class CancelToken implements CancelTokenInstance {
  promise: Promise<string>
  reason?: string | undefined

  constructor(executor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise(resolve => {
      resolvePromise = resolve
    })

    executor((message?: string) => {
      resolvePromise(message)
    })
  }
}
