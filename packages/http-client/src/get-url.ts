import { HttpClientParams } from './http-client';
import { HttpClientError } from './http-client-error';

interface GetUrlParams {
  url: string | undefined;
  baseURL: string | undefined;
  path: string | undefined;
  params: HttpClientParams | undefined;
}

export function getURL({ url = '', baseURL = '', path = '', params = '' }: GetUrlParams) {
  const urlBuilt = buildURL({ url, baseURL, path });
  const searchParams = getSearchParams({ params });

  searchParams.forEach((value, key) => {
    urlBuilt.searchParams.append(key, value);
  });

  return urlBuilt;
}

interface BuildUrlParams {
  url: string;
  baseURL: string;
  path: string;
}

export function buildURL({ url, baseURL, path }: BuildUrlParams): URL {
  if (url !== '') {
    try {
      return new URL(url);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      throw new HttpClientError(`Invalid URL received for the request [url=${url}]`);
    }
  }

  if (baseURL + path !== '') {
    try {
      return new URL(baseURL + path);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      throw new HttpClientError(`Invalid URL received for the request [baseURL=${baseURL}, path=${path}]`);
    }
  }

  throw new HttpClientError('Empty URL received for the request');
}

interface GetSearchParams {
  params: HttpClientParams;
}

function getSearchParams({ params }: GetSearchParams): URLSearchParams {
  if (typeof params === 'string') {
    try {
      return new URLSearchParams(params);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      throw new HttpClientError(`Invalid query string params [params=${params}]`);
    }
  }

  if (params instanceof URLSearchParams) {
    return params;
  }

  if (typeof params === 'object') {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      searchParams.append(key, `${value}`);
    }

    return searchParams;
  }

  return new URLSearchParams();
}
