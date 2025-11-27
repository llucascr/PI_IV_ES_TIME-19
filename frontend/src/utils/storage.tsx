import { config } from "config";
import type { OrganizacaoByIdType } from "types";

export function saveOrganizacao(data: OrganizacaoByIdType): void {
  try {
    const encoded = btoa(JSON.stringify(data));
    localStorage.setItem(config.organizacaoCookieNome, encoded);
    window.dispatchEvent(new Event(config.organizacaoCookieNome));
  } catch (err) {
    console.error("Erro ao salvar organização:", err);
  }
}

export function getOrganizacao(): OrganizacaoByIdType | null {
  try {
    const stored = localStorage.getItem(config.organizacaoCookieNome);
    if (!stored) return null;

    let jsonString: string;
    try {
      jsonString = atob(stored);
    } catch {
      jsonString = decodeURIComponent(stored);
    }

    return JSON.parse(jsonString) as OrganizacaoByIdType;
  } catch (err) {
    console.error("Erro ao recuperar organização:", err);
    return null;
  }
}

export function clearOrganizacao(): void {
  localStorage.removeItem(config.organizacaoCookieNome);
}
