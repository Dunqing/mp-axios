export interface CancelTokenInstance {
  promise: Promise<CancelInstance>
  reason?: CancelInstance
  throwIfRequested: () => void
}

export type CancelExecutor = (cancel: Canceler) => void

export type Canceler = (message?: string) => void

export interface CancelTokenSource {
  token: CancelTokenInstance
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelTokenInstance
  source: () => CancelTokenSource
}

export interface CancelInstance {
  message?: string
}

export type CancelStatic = new (message?: string) => CancelInstance
