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
  response: unknown;
}

export type Logger = (params: LoggerParams) => Promise<void>;

export type GetResponseErrorFunction<Error extends HttpClientError<unknown>> = (
  response: Response,
  message: string,
) => Promise<Error>;

export interface HttpClientConfig<Error extends HttpClientError<unknown>> extends HttpClientCommonConfig {
  apiName: string;
  baseURL?: string;
  getHeaders?: () => Promise<HeadersInit>;
  logger?: Logger | undefined;
  getResponseError?: GetResponseErrorFunction<Error>;
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

export interface RequestParams<Error extends HttpClientError<unknown>> extends Pick<
  HttpClientConfig<Error>,
  'apiName' | 'logger'
> {
  buildURL: URL;
  request: RequestInit;
  urlParams: GetUrlParams;
  getResponseError: GetResponseErrorFunction<Error>;
}

export interface HttpClientSuccessData<Response> {
  data: Response;
  status: number;
}

export interface HttpClientErrorData<Error extends HttpClientError<unknown>> {
  error: Error;
  status: number;
}

export interface HttpClientSuccessResponse<Response> extends HttpClientSuccessData<Response> {
  ok: true;
  error: null;
}

export interface HttpClientErrorResponse<Error extends HttpClientError<unknown>> extends HttpClientErrorData<Error> {
  ok: false;
  data: null;
}

export type HttpClientResponse<Response, Error extends HttpClientError<unknown>> =
  | HttpClientSuccessResponse<Response>
  | HttpClientErrorResponse<Error>;

export type OnRequestCallback = (requestInit: RequestInit) => Promise<RequestInit>;

export type OnErrorCallback<Error extends HttpClientError<unknown> = HttpClientError<unknown>> = (
  request: RequestParams<Error>,
  response: HttpClientErrorData<Error>,
) => Promise<void>;
