/**
 * Verifica si una cadena de texto tiene el formato de un UUID válido (versión 1 a 5).
 *
 * @param text - Cadena de texto a validar como UUID.
 * @returns `true` si la cadena es un UUID válido, de lo contrario `false`.
 */
export function isUUID(text: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(text);
}
