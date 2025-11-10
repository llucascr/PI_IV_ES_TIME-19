import type { UIOptions } from "./uiContext";

export type UIContextType = "modal" | "sidebar";

export type ConfigType = {
  nomeFantasia: string;
  apiUrl: string;
  aplicacaoUrl: string;
  tokenCookieNome: string;
  organizacaoCookieNome: string;

  logo: string;

  UIContext: UIContextType;
  UIOptions: UIOptions;
};
