export type FetchResponse<T> = T extends { data: infer R } ? R : never;

export type FetchErrorResponse = {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
};

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "HEAD";

type HttpOptions = {
  method: HttpMethod;
  data?: any;
  formData?: any;
  params?: Record<string, any>;
  headers?: HeadersInit;
};

export type ParamsUseFetch = {
  url: string;
  options: HttpOptions;
};

export type PromiseUseFetch<T> = {
  data: FetchResponse<T> | undefined;
  error: string | undefined;
  loaded: boolean;
  refetch: () => void;
};

export type PromiseUseCookie = {
  setCookie: (cname: string, cvalue: string, exdays: number) => void;
  getCookie: (cname: string) => string;
  deleteCookie: (cname: string) => void;
  deleteAllCookies: () => void;
};
