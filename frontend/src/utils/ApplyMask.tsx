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
        // Se acabou os dígitos, para ou coloca vazio?
        break; // para aqui para não colocar placeholders incompletos
      }
    } else {
      result += mask[i];
    }
  }

  return result;
}
