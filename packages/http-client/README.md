# polpo-http-client

A small, typed HTTP client built on top of the native `fetch` API, with base URLs, query params, async headers, interceptors, retries, logging and typed errors. No dependencies.

[![npm version](https://badge.fury.io/js/polpo-http-client.svg)](https://www.npmjs.com/package/polpo-http-client)

## Installation

```bash
npm install polpo-http-client
```

```bash
pnpm add polpo-http-client
```

It works anywhere `fetch` is available: browsers, Node.js 18+, Next.js, Vite, Bun and Deno. It ships ESM, CommonJS and TypeScript types.

## Quick start

Create a client for each API, usually by extending `HttpClient`:

```ts
import { HttpClient } from 'polpo-http-client';

type Movie = { id: number; title: string };
type MoviesPage = { page: number; results: Array<Movie> };

export class MoviesAPI extends HttpClient {
  constructor() {
    super({
      apiName: 'MoviesAPI',
      baseURL: 'https://api.example.com/v1',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
    });
  }

  listMovies(page = 1) {
    return this.call<MoviesPage>({ path: '/movies', params: { page } });
  }

  createMovie(movie: Omit<Movie, 'id'>) {
    return this.call<Movie, Omit<Movie, 'id'>>({ path: '/movies', method: 'POST', data: movie });
  }
}

const movies = await new MoviesAPI().listMovies(2); // GET https://api.example.com/v1/movies?page=2
```

You can also create an instance directly: `const api = new HttpClient({ apiName: 'MoviesAPI', baseURL: '...' })`.

## Making requests

### `call<Response, Data>(config, mapData?)`

Returns the parsed JSON body and **throws** an `HttpClientError` when the response is not OK.

```ts
try {
  const movie = await api.call<Movie>({ path: '/movies/42' });
} catch (error) {
  if (error instanceof HttpClientError) {
    console.error(error.status, error.message, error.body);
  }
}
```

### `callNoError<Response, Data>(config, mapData?)`

Never throws: it returns a discriminated result, handy in React components and server actions.

```ts
const result = await api.callNoError<Movie>({ path: '/movies/42' });

if (result.ok) {
  console.log(result.data.title); // data: Movie, error: null
} else {
  console.error(result.status, result.error.message); // data: null
}
```

### Mapping the response

Both methods accept a `mapData` function to transform the JSON before returning it:

```ts
const titles = await api.call<MoviesPage, object, Array<string>>({ path: '/movies' }, page =>
  page.results.map(movie => movie.title),
);
```

Responses with status `202` or `204` resolve with `data: null`.

## Request options

| Option | Type | Description |
| --- | --- | --- |
| `path` | `string` | Appended to the client `baseURL`. |
| `url` | `string` | Absolute URL; ignores `baseURL` and `path`. |
| `method` | `'GET' \| 'POST' \| 'PUT' \| 'DELETE' \| 'PATCH'` | Defaults to `GET`. |
| `params` | `object \| URLSearchParams \| string` | Query string. `undefined` and `null` values are skipped. |
| `data` | `object` | JSON body (`JSON.stringify` is applied). Set the `content-type` header yourself. |
| `body` | `BodyInit` | Raw body (e.g. `FormData`), when you don't use `data`. |
| `headers` | `HeadersInit` | Merged with the client headers. |
| `retries` | `number` | How many times to retry a request that fails with a non-OK response. Default `0`. |
| `signal` | `AbortSignal` | To cancel the request. |
| `cache` | `RequestCache` | `fetch` cache mode. Requests use `'force-cache'` by default; pass `cache: 'no-store'` to skip the cache. |
| `mode`, `credentials`, `redirect`, `referrer`, `referrerPolicy`, `integrity`, `keepalive`, `priority` | | Passed to `fetch` as is. |

## Client options

| Option | Type | Description |
| --- | --- | --- |
| `apiName` | `string` | **Required.** Used in error messages and logs. |
| `baseURL` | `string` | Prefix for every `path`. |
| `headers` | `HeadersInit` | Default headers of every request. |
| `getHeaders` | `() => Promise<HeadersInit>` | Async headers resolved on every request, e.g. an access token. |
| `logger` | `(params: LoggerParams) => Promise<void>` | Called after each request with the URL, request, state (`RESOLVED` or `REJECTED`) and response. |
| `getResponseError` | `(response, message) => Promise<Error>` | Builds a custom error (subclass of `HttpClientError`) from a failed response. |
| `mode`, `credentials`, `cache`... | | Default `fetch` options for every request. |

```ts
const api = new HttpClient({
  apiName: 'BillingAPI',
  baseURL: 'https://billing.example.com/api',
  credentials: 'include',
  getHeaders: async () => ({ Authorization: `Bearer ${await getAccessToken()}` }),
  logger: async ({ apiName, buildURL, state, request }) => {
    console.debug(`[${apiName}] ${request.method} ${buildURL} -> ${state}`);
  },
});
```

## Interceptors

### Before each request

`addOnRequestInterceptor` receives the `RequestInit` and returns the one to send. Interceptors run in the order they were added.

```ts
api.addOnRequestInterceptor(async request => ({
  ...request,
  headers: { ...request.headers, 'x-request-id': crypto.randomUUID() },
}));
```

### On errors

`setOnErrorInterceptor` runs when a response is not OK. Return a new response to recover, or nothing to keep the error. `reFetch` repeats the same request, which is useful for refreshing an expired session:

```ts
api.setOnErrorInterceptor(async ({ isReFetch, reFetch }, { status }) => {
  if (status === 401 && !isReFetch) {
    await refreshSession();

    return reFetch();
  }

  return undefined; // keep the original error
});
```

## Errors

`HttpClientError<Body>` extends `Error` and exposes:

- `status`: HTTP status code (`0` when the request could not be made in `callNoError`);
- `body`: the parsed JSON body of the error response;
- `message`: the `message` or `error` field of the body when present, or a default message with the method and URL.

Use your own error class to type the body of your API:

```ts
import { HttpClient, HttpClientError } from 'polpo-http-client';

type ApiErrorBody = { code: string; message: string };

class ApiError extends HttpClientError<ApiErrorBody> {}

const api = new HttpClient<ApiError>({
  apiName: 'StoreAPI',
  baseURL: 'https://store.example.com/api',
  getResponseError: async (response, message) => new ApiError(await response.json(), response.status, message),
});

const result = await api.callNoError<Order>({ path: '/orders/1' });

if (!result.ok) console.log(result.error.body.code); // typed as ApiErrorBody
```

## Exports

- `HttpClient`: the client class.
- `HttpClientError`: the error class.
- `getDefaultResponseError`, `getResponseErrorMessage`: the default error helpers.
- `RequestState`: the `RESOLVED` and `REJECTED` states.
- Types: `HttpClientConfig`, `HttpClientRequestConfig`, `HttpClientResponse`, `HttpClientSuccessResponse`, `HttpClientErrorResponse`, `Logger`, `LoggerParams`, `OnRequestCallback`, `OnErrorCallback` and more.

## License

MIT

## Author

Developed by [Juan Manuel Sánchez Lozano](https://juanmsl.com). Part of the [Polpo monorepo](https://github.com/juanmsl/polpo-monorepo).
