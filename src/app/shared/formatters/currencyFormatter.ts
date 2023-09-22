import { formatCurrency } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEsAr, 'es-Ar');

/**
 * Format a currency
 * @param value
 * @param format By default it will be `1.2-2`
 * @param simbol By default it will be `$`
 * @returns
 */
export function currencyFormatter(
  value: string | number | undefined,
  format: string = '1.2-2',
  simbol: string = '$'
) {
  if (value === undefined) return '';
  if (typeof value === 'string') value = Number(value);
  const number = Number(value);
  const parsed = formatCurrency(number, 'es-AR', simbol, format);
  return value < 0 ? '(' + parsed.slice(1) + ')' : parsed;
}
