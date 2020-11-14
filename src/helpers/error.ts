import { AxiosRequestConfig, AxiosResponse } from '../types';

export class AxiosError extends Error {
  constructor(
    public config: AxiosRequestConfig,
    public isAxiosError?: boolean,
    public code?: string | null,
    public request?: any,
    public response?: AxiosResponse,
    message?: string,
  ) {
    super(message);
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse,
  isAxiosError?: boolean,
) {
  const error = new AxiosError(config, isAxiosError, code, request, response, message);
  return error;
}
