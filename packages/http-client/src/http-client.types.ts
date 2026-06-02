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

export type GetResponseErrorFunction = (response: Response, message: string) => Promise<HttpClientError>;

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
  status: number;
  error: null;
}

export interface HttpClientErrorResponse {
  data: null;
  status: number;
  error: string;
}

export type HttpClientResponse<Response> = HttpClientSuccessResponse<Response> | HttpClientErrorResponse;

export type OnRequestCallback = (requestInit: RequestInit) => Promise<RequestInit>;

export type OnErrorCallback = <Response = void, NewResponse = Response>(
  config: HttpClientRequestConfig<object>,
  response: HttpClientErrorResponse,
) => Promise<HttpClientResponse<Response | NewResponse>>;
