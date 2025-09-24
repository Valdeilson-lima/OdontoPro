
/**
 * Converts a currency string in Brazilian Real format (e.g., "R$ 1.234,56")
 * @param amaunt - The currency string to convert.
 * @returns The equivalent value in cents.
 * @example
 * coonvertRealCentes("R$ 1.234,56") // returns 123456
 */
export function coonvertRealCentes(amaunt: string) {
  const numericPrice = parseFloat(
    amaunt.replace(/[^0-9,-]+/g, "").replace(",", ".")
  );
  const priceInCents = Math.round(numericPrice * 100);

  return priceInCents;
}
