import type { PromiseUseCookie } from "types";

/**
 * Hook utilitário para manipulação de cookies no navegador.
 *
 * Fornece métodos para criar, buscar e deletar cookies.
 *
 * @returns {PromiseUseCookie} Um objeto com funções para gerenciar cookies.
 *
 * @example
 * const { setCookie, getCookie, deleteCookie, deleteAllCookies } = useCookie();
 * setCookie("user", "john", 7);
 * const user = getCookie("user");
 */
export const useCookie = (): PromiseUseCookie => {
  /**
   * Define um cookie com nome, valor e duração (em dias).
   *
   * @param {string} cname - Nome do cookie.
   * @param {string} cvalue - Valor do cookie.
   * @param {number} exdays - Quantidade de dias até o vencimento.
   *
   * @example
   * setCookie("token", "abc123", 7);
   */
  function setCookie(cname: string, cvalue: string, exdays: number): void {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  /**
   * Obtém o valor de um cookie pelo nome.
   *
   * @param {string} cname - Nome do cookie.
   * @returns {string} Valor do cookie ou string vazia se não encontrado.
   *
   * @example
   * const token = getCookie("token");
   */
  function getCookie(cname: string): string {
    let name: string = cname + "=";
    let decodedCookie: string = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  /**
   * Remove um cookie pelo nome.
   *
   * @param {string} cname - Nome do cookie a ser deletado.
   *
   * @example
   * deleteCookie("token");
   */
  function deleteCookie(cname: string): void {
    document.cookie = cname + "=";
  }

  /**
   * Remove todos os cookies definidos para o domínio atual.
   *
   * @example
   * deleteAllCookies();
   */
  function deleteAllCookies(): void {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie =
        name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }

  return { setCookie, getCookie, deleteCookie, deleteAllCookies };
};
