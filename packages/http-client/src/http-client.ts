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
      logger,
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

    return { buildURL, request, urlParams, apiName, logger, getResponseError };
  }

  private async log(
    { apiName, urlParams, buildURL, request, logger }: RequestParams,
    state: LoggerParams['state'],
    response: HttpClientResponse<unknown>,
  ) {
    if (logger) {
      await logger({ apiName, buildURL, urlParams, request, state, response });
    }
  }

  public async callOrThrow<Response = void, Data extends object = object>(
    config: HttpClientRequestConfig<Data>,
  ): Promise<HttpClientSuccessResponse<Response>>;

  public async callOrThrow<Response, Data extends object = object, NewResponse = Response>(
    config: HttpClientRequestConfig<Data>,
    mapData: (data: Response) => NewResponse,
  ): Promise<HttpClientSuccessResponse<NewResponse>>;

  public async callOrThrow<Response, Data extends object = object, NewResponse = Response>(
    config: HttpClientRequestConfig<Data>,
    mapData?: undefined | ((data: Response) => NewResponse),
  ): Promise<HttpClientSuccessResponse<Response | NewResponse>> {
    const requestParams = await this.getRequestParams(config);
    const { apiName, buildURL, request, getResponseError } = requestParams;
    const response = await fetch(buildURL, request);

    if (!response.ok) {
      const message = await getResponseErrorMessage(
        response.clone(),
        `[${apiName}]: There was a problem fetching [${request.method}] - ${buildURL}`,
      );

      const error = await getResponseError(response, message);

      const errorResponse = mapErrorToHttpClientErrorResponse(error);
      await this.log(requestParams, RequestState.REJECTED, errorResponse);

      if (this.onErrorInterceptor) {
        await this.onErrorInterceptor<Response, NewResponse>(requestParams.request, errorResponse);
      }

      throw error;
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

    const successResponse: HttpClientSuccessResponse<Response | NewResponse> = {
      data: mapData ? mapData(data) : data,
      errorData: null,
      status: response.status,
      errorMessage: null,
      error: null,
    };

    await this.log(requestParams, RequestState.RESOLVED, successResponse);

    return successResponse;
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
    try {
      return mapData
        ? await this.callOrThrow<Response, Data, NewResponse>(config, mapData)
        : await this.callOrThrow<Response, Data>(config);
    } catch (error: unknown) {
      return mapErrorToHttpClientErrorResponse<ErrorResponse>(error as HttpClientError<ErrorResponse>);
    }
  }
}
