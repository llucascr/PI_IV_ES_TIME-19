/**
 * Aplica uma máscara numérica ao valor informado.
 *
 * @param value - String com dígitos (ex: "12345678901")
 * @param mask - Máscara no formato com 'x' para dígitos (ex: "xxx.xxx.xxx-xx")
 * @returns Valor formatado conforme máscara (ex: "123.456.789-01")
 */
export function applyMask(value: string, mask: string): string {
  // Remove tudo que não for dígito
  const digits = value.replace(/\D/g, "");
  let result = "";
  let digitIndex = 0;

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === "x") {
      if (digitIndex < digits.length) {
        result += digits[digitIndex];
        digitIndex++;
      } else {
        // Se não tiver mais dígitos, não adiciona nada, mas não coloca os caracteres fixos
        break;
      }
    } else {
      // Adiciona o caractere fixo apenas se houver dígito correspondente depois dele
      if (digitIndex < digits.length) {
        result += mask[i];
      } else {
        break;
      }
    }
  }

  return result;
}
