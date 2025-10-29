import { useState, useEffect, useMemo } from "react";
import { useCookie } from "./useCookie";
import type { FetchResponse, ParamsUseFetch, PromiseUseFetch } from "types";
import { config } from "config";

/**
 * Hook personalizado para realizar requisições HTTP com controle de estado.
 *
 * É genérico e pode ser utilizado para qualquer tipo de resposta.
 *
 * @template T Tipo esperado do corpo da resposta.
 * @param {ParamsUseFetch} params - Objeto com `url` e `options` para a requisição.
 * @returns {PromiseUseFetch<T>} Objeto com dados, erro, carregamento e função `refetch`.
 *
 * @example
 * const { data, error, loaded, refetch } = useFetch<User[]>({
 *   url: "/api/users",
 *   options: { method: "GET" }
 * });
 */
export const useFetch = <T extends { data: FetchResponse<T> }>({
  url,
  options,
}: ParamsUseFetch): PromiseUseFetch<T> => {
  const { getCookie } = useCookie();
  const [data, setData] = useState<FetchResponse<T> | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

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

  /**
   * Executa a requisição usando `fetch` e atualiza os estados de `data`, `loading` e `error`.
   *
   * @returns {Promise<void>}
   */
  const fetchData = async () => {
    setLoading(true);

    try {
      const fullUrl: string = buildQueryParams(url, options.params);

      const response = await fetch(fullUrl, {
        method: options.method,
        body: JSON.stringify(options.data),
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie(config.tokenCookieNome)}`,
          ...options.headers,
        },
      });

      console.log(response);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}: ${response.statusText}`);
      }

      const result: FetchResponse<T> = await response.json();

      setData(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("NÃO FOI POSSIVEL PROCESSAR!");
      }
    } finally {
      setLoading(false);
    }
  };

  // Memoriza as opções para evitar re-fetchs desnecessários.
  const memoizedOptions = useMemo(
    () => options,
    [options.method, options.data, options.params, options.headers]
  );

  // Executa a requisição ao montar o componente ou mudar os parâmetros.
  useEffect(() => {
    fetchData();
  }, [url, JSON.stringify(memoizedOptions)]);

  return { data, error, loaded: loading, refetch: fetchData };
};
