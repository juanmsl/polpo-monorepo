import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios';

import { HttpClientError } from './http-client-error';

export interface HttpClientParams extends CreateAxiosDefaults {}

export interface HttpClientResponse<T> {
  data: T;
  status: number;
  headers: AxiosResponse['headers'];
}

export interface HttpClientRequestConfig extends AxiosRequestConfig {}

export class HttpClient {
  private http: AxiosInstance;

  constructor(config: HttpClientParams) {
    this.http = axios.create(config);
  }

  async call<T>(config: HttpClientRequestConfig): Promise<HttpClientResponse<T>> {
    try {
      const response = await this.http.request<T>(config);

      return {
        data: response.data,
        status: response.status,
        headers: response.headers,
      };
    } catch (error) {
      throw new HttpClientError(error);
    }
  }
}
