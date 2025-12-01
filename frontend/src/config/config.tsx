import type { ConfigType } from "types";

/**
 * Configurações estáticas da aplicação.
 */
export const config: ConfigType = {
  nomeFantasia: "ProcessHub",
  apiUrl: import.meta.env.VITE_API_URL,
  aplicacaoUrl: import.meta.env.VITE_URL + import.meta.env.VITE_PORT,
  tokenCookieNome: import.meta.env.VITE_TOKEN_COOKIE_NAME,
  organizacaoCookieNome: "organizacao",

  logo: "URL/SRC",

  UIContext: "modal",
  UIOptions: {
    position: "right",
    size: "medium",
    titulo: "Modal Padrão",
    widthFraction: "1/3",
  },
};
