import { AxiosError } from 'axios';

export class HttpClientError extends Error {
  constructor(error: unknown) {
    super();

    this.message = 'Unexpected error occurred';

    if (error instanceof Error) {
      this.message = error.message;
      this.stack = error.stack ?? '';

      if (error instanceof AxiosError) {
        this.message += `, Response [${JSON.stringify(error.response?.data)}]`;
      }
    }
  }
}
