import type {AppConfig} from '../config';
import type {Logger} from '../observability';
import type {TokenStore} from '../services/auth/tokenStore';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpRequest = {
  method?: HttpMethod;
  path: string;
  body?: unknown;
  headers?: Record<string, string>;
  retry?: number;
  authenticated?: boolean;
};

export type HttpClient = {
  request<TResponse>(request: HttpRequest): Promise<TResponse>;
  get<TResponse>(path: string, request?: Omit<HttpRequest, 'path' | 'method'>): Promise<TResponse>;
  post<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    request?: Omit<HttpRequest, 'path' | 'method' | 'body'>,
  ): Promise<TResponse>;
  put<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    request?: Omit<HttpRequest, 'path' | 'method' | 'body'>,
  ): Promise<TResponse>;
  patch<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    request?: Omit<HttpRequest, 'path' | 'method' | 'body'>,
  ): Promise<TResponse>;
};

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly payload?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type FetchLike = typeof fetch;

export function createHttpClient(
  config: AppConfig,
  logger: Logger,
  tokenStore: TokenStore,
  fetcher: FetchLike = fetch,
): HttpClient {
  async function request<TResponse>({
    method = 'GET',
    path,
    body,
    headers,
    retry = 1,
    authenticated = true,
  }: HttpRequest): Promise<TResponse> {
    const url = `${config.apiBaseUrl}${path}`;
    const token = authenticated ? await tokenStore.getAccessToken() : null;
    const startedAt = Date.now();

    const requestHeaders: Record<string, string> = {
      Accept: 'application/json',
      ...headers,
    };

    if (body !== undefined) {
      requestHeaders['Content-Type'] = 'application/json';
    }

    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }

    try {
      logger.debug('HTTP request', {method, url});

      const response = await fetcher(url, {
        method,
        headers: requestHeaders,
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      const payload = await parseResponse(response);

      logger.debug('HTTP response', {
        method,
        url,
        status: response.status,
        durationMs: Date.now() - startedAt,
      });

      if (!response.ok) {
        throw new ApiError(extractMessage(payload), response.status, payload);
      }

      return payload as TResponse;
    } catch (error) {
      if (retry > 0 && shouldRetry(error)) {
        logger.warn('Retrying HTTP request', {method, url, retry});
        return request<TResponse>({
          method,
          path,
          body,
          headers,
          retry: retry - 1,
          authenticated,
        });
      }

      logger.error('HTTP request failed', {
        method,
        url,
        error: error instanceof Error ? error.message : String(error),
      });

      throw error;
    }
  }

  return {
    request,
    get: (path, nextRequest) => request({...nextRequest, path, method: 'GET'}),
    post: (path, body, nextRequest) =>
      request({...nextRequest, path, body, method: 'POST'}),
    put: (path, body, nextRequest) =>
      request({...nextRequest, path, body, method: 'PUT'}),
    patch: (path, body, nextRequest) =>
      request({...nextRequest, path, body, method: 'PATCH'}),
  };
}

async function parseResponse(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function extractMessage(payload: unknown) {
  if (
    payload &&
    typeof payload === 'object' &&
    'message' in payload &&
    typeof payload.message === 'string'
  ) {
    return payload.message;
  }

  return 'Request failed';
}

function shouldRetry(error: unknown) {
  if (error instanceof ApiError) {
    return error.status === undefined || error.status >= 500;
  }

  return true;
}
