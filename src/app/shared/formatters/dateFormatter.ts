import moment from 'moment';

/**
 * @param format An optional string refering to moment.js formats. By default
 * it will be 'DD/MM/YYYY'.
 * See {@link https://momentjs.com/docs/#/displaying/format/}
 */
export function dateFormatter(
  value: string | undefined,
  format: string = 'DD/MM/YYYY'
) {
  return value ? moment(value.trim()).format(format) : '';
}
