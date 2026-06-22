import type { HttpClientErrorResponse } from './http-client.types';

export class HttpClientError<Body> extends Error {
  constructor(
    readonly body: Body,
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

export async function getDefaultResponseError<ErrorResponse>(response: Response, message: string) {
  const body = (await response.json()) as ErrorResponse;

  return new HttpClientError<ErrorResponse>(body, response.status, message);
}

export function mapErrorToHttpClientErrorResponse<ErrorResponse = unknown>(
  error: HttpClientError<ErrorResponse>,
): HttpClientErrorResponse<ErrorResponse> {
  const { status = 500, message = '', body } = error;

  return {
    data: null,
    errorData: body,
    errorMessage: message,
    status: status,
    error,
  };
}
