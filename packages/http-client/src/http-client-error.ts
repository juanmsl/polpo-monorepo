export class HttpClientError extends Error {
  constructor(error: unknown) {
    super();

    this.message = 'Unexpected error occurred';

    if (error instanceof Error) {
      this.message = error.message;
      this.stack = error.stack ?? '';
    }
  }
}
