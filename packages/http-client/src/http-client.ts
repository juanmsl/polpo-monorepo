import { getResponseErrorMessage, getDefaultResponseError, HttpClientError } from './http-client.error';
import {
  GetResponseErrorFunction,
  type HttpClientConfig,
  HttpClientErrorData,
  type HttpClientRequestConfig,
  type HttpClientResponse,
  HttpClientSuccessData,
  type LoggerParams,
  type OnErrorCallback,
  type OnRequestCallback,
  type RequestParams,
  RequestState,
} from './http-client.types';
import { getURL, type GetUrlParams } from './http-client.url-helpers';

export class HttpClient<ClassError extends HttpClientError<unknown> = HttpClientError<unknown>> {
  private onErrorInterceptor: OnErrorCallback<ClassError> | undefined = undefined;
  private onRequestInterceptors: Array<OnRequestCallback> = [];

  constructor(private readonly httpConfig: HttpClientConfig<ClassError>) {}

  public setOnErrorInterceptor(interceptor: OnErrorCallback<ClassError>) {
    this.onErrorInterceptor = interceptor;
  }

  public addOnRequestInterceptor(interceptor: OnRequestCallback) {
    this.onRequestInterceptors.push(interceptor);
  }

  private async getRequestParams<Data extends object>(
    _config: HttpClientRequestConfig<Data>,
  ): Promise<RequestParams<ClassError>> {
    const { path, url, params, disableCache, data: requestData, retries: _, ...config } = _config;
    const {
      baseURL,
      apiName,
      logger,
      getHeaders,
      getResponseError = getDefaultResponseError as GetResponseErrorFunction<ClassError>,
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
    { apiName, urlParams, buildURL, request, logger }: RequestParams<ClassError>,
    state: LoggerParams['state'],
    response: HttpClientSuccessData<unknown> | HttpClientErrorData<HttpClientError<unknown>>,
  ) {
    if (logger) {
      await logger({ apiName, buildURL, urlParams, request, state, response });
    }
  }

  private async fetchCall<Response>(requestParams: RequestParams<ClassError>): Promise<HttpClientSuccessData<Response>>;

  private async fetchCall<Response, NewResponse = Response>(
    requestParams: RequestParams<ClassError>,
    mapData: undefined | ((data: Response) => NewResponse),
  ): Promise<HttpClientSuccessData<NewResponse>>;

  private async fetchCall<Response, NewResponse = Response>(
    requestParams: RequestParams<ClassError>,
    mapData?: undefined | ((data: Response) => NewResponse),
  ): Promise<HttpClientSuccessData<Response | NewResponse>> {
    const { apiName, buildURL, request, getResponseError } = requestParams;
    const response = await fetch(buildURL, request);

    if (!response.ok) {
      const message = await getResponseErrorMessage(
        response.clone(),
        `[${apiName}]: There was a problem fetching [${request.method}] - ${buildURL}`,
      );

      const error = await getResponseError(response, message);

      await this.log(requestParams, RequestState.REJECTED, {
        status: response.status,
        error,
      });

      if (this.onErrorInterceptor) {
        await this.onErrorInterceptor(requestParams, {
          status: response.status,
          error,
        });
      }

      throw error;
    }

    if (response.status === 204 || response.status === 202) {
      return {
        data: null as Response,
        status: response.status,
      };
    }

    const data = (await response.json()) as Response;

    const successResponse: HttpClientSuccessData<Response | NewResponse> = {
      data: mapData ? mapData(data) : data,
      status: response.status,
    };

    await this.log(requestParams, RequestState.RESOLVED, successResponse);

    return successResponse;
  }

  public async call<Response, Data extends object = object>(config: HttpClientRequestConfig<Data>): Promise<Response>;

  public async call<Response, Data extends object = object, NewResponse = Response>(
    config: HttpClientRequestConfig<Data>,
    mapData: undefined | ((data: Response) => NewResponse),
  ): Promise<NewResponse>;

  public async call<Response, Data extends object = object, NewResponse = Response>(
    config: HttpClientRequestConfig<Data>,
    mapData?: undefined | ((data: Response) => NewResponse),
  ): Promise<Response | NewResponse> {
    const requestParams = await this.getRequestParams<Data>(config);
    const response = mapData
      ? await this.fetchCall<Response, NewResponse>(requestParams, mapData)
      : await this.fetchCall<Response>(requestParams);

    return response.data;
  }

  public async callNoError<
    Response = void,
    Data extends object = object,
    Error extends HttpClientError<unknown> = ClassError,
  >(config: HttpClientRequestConfig<Data>): Promise<HttpClientResponse<Response, Error>>;

  public async callNoError<
    Response = void,
    Data extends object = object,
    NewResponse = Response,
    Error extends HttpClientError<unknown> = ClassError,
  >(
    config: HttpClientRequestConfig<Data>,
    mapData: (data: Response) => NewResponse,
  ): Promise<HttpClientResponse<NewResponse, Error>>;

  public async callNoError<
    Response = void,
    Data extends object = object,
    NewResponse = Response,
    Error extends HttpClientError<unknown> = ClassError,
  >(
    config: HttpClientRequestConfig<Data>,
    mapData?: (data: Response) => NewResponse,
  ): Promise<HttpClientResponse<Response | NewResponse, Error>> {
    try {
      const requestParams = await this.getRequestParams<Data>(config);
      const { data, status } = mapData
        ? await this.fetchCall<Response, NewResponse>(requestParams, mapData)
        : await this.fetchCall<Response>(requestParams);

      return {
        data,
        status,
        error: null,
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        data: null,
        status: error instanceof HttpClientError ? error.status : 0,
        error: error as Error,
      };
    }
  }
}
