const hasOwn = {}.hasOwnProperty;

/**
 * Constrói uma string de classes CSS dinamicamente.
 *
 * Aceita qualquer número de argumentos do tipo string, boolean, null, undefined ou objeto:
 * - Strings são adicionadas diretamente.
 * - Objetos: chaves com valor truthy são incluídas como classes.
 * - Arrays são processados recursivamente.
 *
 * @example
 * classnames("btn", { active: isActive, disabled: false }, ["px-2", null])
 * // Resultado: "btn active px-2"
 *
 * @param {...(string | object | undefined | null | boolean)[]} args - Lista de classes e condições.
 * @returns {string} String final de classes separadas por espaço.
 */
export function classnames(
  ...args: (string | object | undefined | null | boolean)[]
): string {
  let classes = "";
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg) {
      classes = appendClass(classes, parseValue(arg));
    }
  }

  return classes;
}

/**
 * Converte um argumento em string de classes.
 *
 * - Strings são retornadas como estão.
 * - Objetos: inclui chaves com valor truthy.
 * - Arrays: processados recursivamente.
 *
 * @param arg - Argumento a ser processado.
 * @returns String de classes ou vazia.
 */
function parseValue(arg: string | object | undefined | null | boolean): string {
  if (typeof arg === "string") {
    return arg;
  }

  if (typeof arg !== "object" || arg === null) {
    return "";
  }

  // Processa array de classes
  if (Array.isArray(arg)) {
    return classnames(...arg);
  }

  // Suporte a objetos com `toString()` customizados (não nativos)
  if (
    arg.toString !== Object.prototype.toString &&
    !arg.toString.toString().includes("[native code]")
  ) {
    return arg.toString();
  }


  // Processa objetos: adiciona chave se valor for truthy
  let classes = "";

  for (const key in arg) {
    if (hasOwn.call(arg, key) && (arg as Record<string, unknown>)[key]) {
      classes = appendClass(classes, key);
    }
  }

  return classes;
}

/**
 * Concatena duas strings de classe com espaço.
 *
 * @param value - String atual.
 * @param newClass - Nova classe a ser adicionada.
 * @returns String combinada.
 */
function appendClass(value: string, newClass: string): string {
  if (!newClass) {
    return value;
  }

  return value ? `${value} ${newClass}` : newClass;
}
