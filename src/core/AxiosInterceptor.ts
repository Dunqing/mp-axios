import { AxiosInterceptorsManager, RejectedFn, ResolvedFn } from '../types/index';

interface Interceptor<T> {
  resolved: ResolvedFn<T>;
  rejected?: RejectedFn;
}

export class InterceptorManager<T> implements AxiosInterceptorsManager<T> {
  private interceptors: Array<Interceptor<T> | null>;
  constructor() {
    this.interceptors = [];
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn | undefined): number {
    this.interceptors.push({
      resolved,
      rejected,
    });
    return this.interceptors.length;
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach((interceptor) => {
      if (interceptor) {
        fn(interceptor);
      }
    });
  }

  eject(id: number): boolean {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
      return true;
    }
    return false;
  }
}
