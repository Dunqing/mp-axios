import { CancelInstance } from '../types/CancelToken'

export default class Cancel implements CancelInstance {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
