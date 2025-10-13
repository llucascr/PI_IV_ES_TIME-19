import { config } from "config";
import { useCookie } from "hooks";
import type { FetchErrorResponse, FetchResponse, ParamsUseFetch } from "types";

/**
 * Função utilitária para chamadas imperativas de API.
 */
export async function apiFetch<T>({ url, options }: ParamsUseFetch): Promise<{
  data: FetchResponse<T>;
  error: FetchErrorResponse;
}> {
  const { getCookie } = useCookie();

  /**
   * Constrói a URL com os parâmetros de query fornecidos.
   *
   * @param {string} baseUrl - URL base sem parâmetros.
   * @param {Record<string, any>} [params] - Parâmetros para compor a query string.
   * @returns {string} URL completa com parâmetros.
   */
  const buildQueryParams = (
    baseUrl: string,
    params?: Record<string, any>
  ): string => {
    const url = new URL(baseUrl);
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined) {
          url.searchParams.append(key, String(params[key]));
        }
      });
    }
    return url.toString();
  };

  const fullUrl: string = buildQueryParams(url, options.params);

  let result;
  let error;

  try {
    const response = await fetch(fullUrl, {
      method: options.method,
      body: options.data ? JSON.stringify(options.data) : options.formData,
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie(config.tokenCookieNome)}`,
        ...options.headers,
      },
    });

    result = await response.json();
  } catch (err: any) {
    error = err.body;
  }

  return { data: result, error: error };
}
