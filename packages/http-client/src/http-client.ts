import { getURL } from './get-url';
import { HttpClientError } from './http-client-error';

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

export interface HttpClientConfig extends HttpClientCommonConfig {
  baseURL?: string;
}

export interface HttpClientRequestConfig extends HttpClientCommonConfig {
  url?: string;
  path?: string;
  method?: string;
  body?: BodyInit;
  data?: object;
  signal?: AbortSignal;
  params?: HttpClientParams;
  window?: null;
}

export interface HttpClientResponse<T> {
  data: T;
  status: number;
  headers: HeadersInit;
}

export class HttpClient {
  private readonly httpConfig: HttpClientConfig;

  constructor(config: HttpClientConfig = {}) {
    this.httpConfig = config;
  }

  async call<T>({ path, url, params, data, ...config }: HttpClientRequestConfig): Promise<HttpClientResponse<T>> {
    try {
      const { baseURL, ...httpConfig } = this.httpConfig;
      const buildURL = getURL({ url, baseURL, path, params });
      const response = await fetch(buildURL, {
        method: 'GET',
        body: data ? JSON.stringify(data) : '',
        ...httpConfig,
        ...config,
      });

      if (!response.ok) {
        throw new HttpClientError(`Response status: ${response.status}`);
      }

      const responseJson: T = await response.json();

      return {
        data: responseJson,
        status: response.status,
        headers: response.headers,
      };
    } catch (error) {
      throw new HttpClientError(error);
    }
  }
}
