import {
  Canceler,
  CancelExecutor,
  CancelInstance,
  CancelTokenInstance,
  CancelTokenSource
} from '../types/CancelToken'
import Cancel from './Cancel'

type ResolvePromise = (cancel?: CancelInstance) => void

export class CancelToken implements CancelTokenInstance {
  promise: Promise<CancelInstance>
  reason?: CancelInstance

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    this.promise = new Promise(resolve => {
      resolvePromise = resolve
    })

    executor((message?: string) => {
      if (typeof this.reason === 'string') {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      token,
      cancel
    }
  }

  throwIfRequested(): void {
    if (typeof this.reason !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw this.reason
    }
  }
}
