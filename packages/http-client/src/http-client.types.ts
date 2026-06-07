import { type GetUrlParams } from './http-client.url-helpers';

import type { HttpClientError } from './http-client.error';

export type HttpClientParams = object | URLSearchParams | string;

export interface HttpClientCommonConfig {
  headers?: HeadersInit;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  mode?: RequestMode;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  integrity?: string;
  keepalive?: boolean;
  priority?: RequestPriority;
  redirect?: RequestRedirect;
}

export const RequestState = {
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED',
} as const;

export interface LoggerParams {
  apiName: string;
  buildURL: URL;
  request: RequestInit;
  urlParams: GetUrlParams;
  state: (typeof RequestState)[keyof typeof RequestState];
  response: HttpClientResponse<unknown> | null;
}

export type Logger = (params: LoggerParams) => Promise<void>;

export type GetResponseErrorFunction = (response: Response, message: string) => Promise<HttpClientError<unknown>>;

export interface HttpClientConfig extends HttpClientCommonConfig {
  apiName: string;
  baseURL?: string;
  getHeaders?: () => Promise<HeadersInit>;
  getLogger?: (() => Logger) | undefined;
  getResponseError?: GetResponseErrorFunction;
}

export interface HttpClientRequestConfig<Data extends object> extends HttpClientCommonConfig {
  url?: string;
  path?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: BodyInit;
  signal?: AbortSignal;
  params?: HttpClientParams;
  window?: null;
  disableCache?: boolean;
  data?: Data;
  retries?: number;
}

export interface RequestParams extends Pick<HttpClientConfig, 'apiName' | 'getLogger'> {
  buildURL: URL;
  request: RequestInit;
  urlParams: GetUrlParams;
  getResponseError: GetResponseErrorFunction;
}

export interface HttpClientSuccessResponse<Response> {
  data: Response;
  errorData: null;
  status: number;
  errorMessage: null;
  error: null;
}

export interface HttpClientErrorResponse<ErrorResponse = unknown> {
  data: null;
  errorData: ErrorResponse;
  status: number;
  errorMessage: string;
  error: Error;
}

export type HttpClientResponse<Response, ErrorResponse = unknown> =
  | HttpClientSuccessResponse<Response>
  | HttpClientErrorResponse<ErrorResponse>;

export type OnRequestCallback = (requestInit: RequestInit) => Promise<RequestInit>;

export type OnErrorCallback = <Response = void, NewResponse = Response, ErrorResponse = unknown>(
  request: RequestInit,
  response: HttpClientErrorResponse<ErrorResponse>,
) => Promise<HttpClientResponse<Response | NewResponse, ErrorResponse>>;
