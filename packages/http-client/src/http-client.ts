import {
  getResponseErrorMessage,
  getDefaultResponseError,
  mapErrorToHttpClientErrorResponse,
  HttpClientError,
} from './http-client.error';
import {
  type HttpClientConfig,
  type HttpClientRequestConfig,
  type HttpClientResponse,
  type HttpClientSuccessResponse,
  type LoggerParams,
  type OnErrorCallback,
  type OnRequestCallback,
  type RequestParams,
  RequestState,
} from './http-client.types';
import { getURL, type GetUrlParams } from './http-client.url-helpers';

export class HttpClient {
  private onErrorInterceptor: OnErrorCallback | undefined = undefined;
  private onRequestInterceptors: Array<OnRequestCallback> = [];

  constructor(private readonly httpConfig: HttpClientConfig) {}

  public setOnErrorInterceptor(interceptor: OnErrorCallback) {
    this.onErrorInterceptor = interceptor;
  }

  public addOnRequestInterceptor(interceptor: OnRequestCallback) {
    this.onRequestInterceptors.push(interceptor);
  }

  private async getRequestParams<Data extends object = object>(
    _config: HttpClientRequestConfig<Data>,
  ): Promise<RequestParams> {
    const { path, url, params, disableCache, data: requestData, retries: _, ...config } = _config;
    const {
      baseURL,
      apiName,
      getLogger,
      getHeaders,
      getResponseError = getDefaultResponseError,
      ...httpConfig
    } = this.httpConfig;
    const urlParams: GetUrlParams = { url, baseURL, path, params };
    const buildURL = getURL(urlParams);

    let request: RequestInit = {
      method: 'GET',
      cache: !disableCache || config.method === 'GET' ? 'force-cache' : 'no-store',
      body: requestData ? JSON.stringify(requestData) : null,
      ...httpConfig,
      ...config,
      headers: {
        ...httpConfig.headers,
        ...config.headers,
        ...(getHeaders ? await getHeaders() : {}),
      },
    };

    for (const interceptor of this.onRequestInterceptors) {
      request = await interceptor(request);
    }

    return { buildURL, request, urlParams, apiName, getLogger, getResponseError };
  }

  private async log(
    { apiName, urlParams, buildURL, request, getLogger }: RequestParams,
    state: LoggerParams['state'],
    response: HttpClientResponse<unknown>,
  ) {
    if (getLogger) {
      const logger = getLogger();
      await logger({ apiName, buildURL, urlParams, request, state, response });
    }
  }

  private async callOrThrow<Response>({
    apiName,
    buildURL,
    request,
    getResponseError,
  }: RequestParams): Promise<HttpClientSuccessResponse<Response>> {
    const response = await fetch(buildURL, request);

    if (!response.ok) {
      const message = await getResponseErrorMessage(
        response.clone(),
        `[${apiName}]: There was a problem fetching [${request.method}] - ${buildURL}`,
      );

      throw await getResponseError(response, message);
    }

    if (response.status === 204 || response.status === 202) {
      return {
        data: null as Response,
        errorData: null,
        status: response.status,
        errorMessage: null,
        error: null,
      };
    }

    const data = (await response.json()) as Response;

    return {
      data,
      errorData: null,
      status: response.status,
      errorMessage: null,
      error: null,
    };
  }

  public async call<Response = void, Data extends object = object, ErrorResponse = unknown>(
    config: HttpClientRequestConfig<Data>,
  ): Promise<HttpClientResponse<Response, ErrorResponse>>;

  public async call<Response = void, Data extends object = object, NewResponse = Response, ErrorResponse = unknown>(
    config: HttpClientRequestConfig<Data>,
    mapData: (data: Response) => NewResponse,
  ): Promise<HttpClientResponse<NewResponse, ErrorResponse>>;

  public async call<Response = void, Data extends object = object, NewResponse = Response, ErrorResponse = unknown>(
    config: HttpClientRequestConfig<Data>,
    mapData?: (data: Response) => NewResponse,
  ): Promise<HttpClientResponse<Response | NewResponse, ErrorResponse>> {
    const requestParams = await this.getRequestParams(config);

    try {
      const response = await this.callOrThrow<Response>(requestParams);
      await this.log(requestParams, RequestState.RESOLVED, response);

      return {
        ...response,
        data: mapData ? mapData(response.data) : response.data,
      };
    } catch (error: unknown) {
      const errorResponse = mapErrorToHttpClientErrorResponse<ErrorResponse>(error as HttpClientError<ErrorResponse>);
      await this.log(requestParams, RequestState.REJECTED, errorResponse);

      if (this.onErrorInterceptor) {
        return this.onErrorInterceptor<Response, NewResponse, ErrorResponse>(requestParams.request, errorResponse);
      }

      return errorResponse;
    }
  }
}
