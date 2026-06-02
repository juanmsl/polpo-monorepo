import type { HttpClientErrorResponse } from './http-client.types';

export class HttpClientError extends Error {
  constructor(
    readonly status: number,
    readonly message: string = '[HttpClientError]: Unexpected error occurred',
    readonly error?: unknown,
  ) {
    super(`[HttpClientError]: ${message}`);

    if (error instanceof Error) {
      this.stack = error.stack ?? '';
    }
  }
}

interface HttpClientResponseError {
  message?: string;
  error?: string;
}

export async function getResponseErrorMessage(response: Response, defaultMessage: string) {
  const body = (await response.json()) as HttpClientResponseError;

  if (!body) {
    return 'No error body founded on the response.';
  }

  if (body.message) {
    return body.message;
  }

  if (body.error) {
    return body.error;
  }

  return defaultMessage;
}

export async function getDefaultResponseError(response: Response, message: string) {
  return new HttpClientError(response.status, message);
}

export function mapErrorToHttpClientErrorResponse(error: HttpClientError): HttpClientErrorResponse {
  const { status = 500, message = '' } = error;

  return {
    data: null,
    error: message,
    status: status,
  };
}
