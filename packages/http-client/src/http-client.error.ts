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

export async function getDefaultResponseError(response: Response, message: string) {
  const body = (await response.json()) as unknown;

  return new HttpClientError<unknown>(body, response.status, message);
}
