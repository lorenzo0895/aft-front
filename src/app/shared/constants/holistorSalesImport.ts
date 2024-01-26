import { Workbook, Worksheet } from 'exceljs';

const columns =  [
  { value: 'Fecha Emisión ', chars: 11, backgroundColor: 'c7e0b4' },
  { value: ' Cpbte', chars: 8, backgroundColor: 'c7e0b4' },
  { value: 'Suc. ', chars: 5, pad: 'right', backgroundColor: 'c7e0b4' },
  { value: 'Número  ', chars: 8, pad: 'right', backgroundColor: 'c7e0b4' },
  { value: 'N° Hasta', chars: 8, backgroundColor: 'c7e0b4' },
  { value: 'Cód. Autorización', chars: 0.5, backgroundColor: 'c7e0b4' },
  { value: 'Tipo Doc. ', chars: 1, backgroundColor: 'c7e0b4', hideContent: true },
  { value: 'CUIT    ', chars: 11, backgroundColor: 'c7e0b4', pad: 'right' },
  { value: 'Razón Social/Denominación Comprador', chars: 25, backgroundColor: 'c7e0b4' },
  { value: 'Tipo Cbio.', chars: 6, backgroundColor: 'c7e0b4', pad: 'right', format: '0.00' },
  { value: 'Moneda', chars: 3, backgroundColor: 'c7e0b4' },
  { value: 'Neto Gravado', chars: 0.5, backgroundColor: 'c7e0b4' },
  { value: 'Importes No Gravados', chars: 0.5, backgroundColor: 'c7e0b4' },
  { value: 'Importes Exentos', chars: 0.5, backgroundColor: 'c7e0b4' },
  { value: 'Otros Tributos', chars: 0.5, backgroundColor: 'c7e0b4' },
  { value: 'IVA  Crédito', chars: 0.5, backgroundColor: 'c7e0b4' },
  { value: 'Importe   Total', chars: 12, pad: 'right', format: '0.00', backgroundColor: 'c7e0b4' },
  { value: 'Neto Gravado', chars: 13, backgroundColor: 'ffcc99', pad: 'right', format: '0.00' },
  { value: 'Importes No Gravados', chars: 12, backgroundColor: 'ffcc99', pad: 'right', format: '0.00' },
  { value: 'Importes Exentos', chars: 12, backgroundColor: 'ffcc99', pad: 'right', format: '0.00' },
  { value: 'IVA  Liquidado', chars: 11, backgroundColor: 'ffcc99', pad: 'right', format: '0.00' },
  { value: 'Importe   Total', chars: 13, backgroundColor: 'ffcc99', pad: 'right', format: '0.00' },
  { value: 'Pcia', chars: 3, backgroundColor: 'ccffcc' },
  { value: 'Neto Cód. ', chars: 6, backgroundColor: 'ffff99' },
  { value: 'Alíc.', chars: 6, backgroundColor: 'ffcc99', format: '0.000' },
  { value: 'Neto a importar', chars: 13, backgroundColor: 'ffcc99', pad: 'right', format: '0.00' },
  { value: 'IVA   Débito', chars: 11, backgroundColor: 'ffcc99', pad: 'right', format: '0.00' },
  { value: 'NG/EX  Cód.', chars: 5, backgroundColor: 'ff99cc' },
  { value: 'P/R Cód. ', chars: 4, backgroundColor: 'cc99ff' },
  { value: 'Perc./Ret.', chars: 10, backgroundColor: 'cc99ff' },
  { value: 'Pcia P/R', chars: 4, backgroundColor: 'cc99ff' },
  { value: 'Cód Cte', chars: 3, backgroundColor: 'ccffcc' },
  { value: 'Moneda', chars: 3, backgroundColor: 'ccffcc' },
  { value: 'Pto.Vta', chars: 5, backgroundColor: 'ccffcc' },
  { value: 'Cd Dc', chars: 2, backgroundColor: 'ccffcc' },
  { value: 'DIFERENCIA', chars: 11, backgroundColor: 'ccffcc', pad: 'right', format: '0.00', hideContent: true },
];
const _excel = new Workbook();
const _sheet = _excel.addWorksheet('HWComprobantes Emitidos');
_sheet.mergeCells('A1:Q1');
_sheet.getCell(1, 1).value = 'Datos origen copia desde AFIP - MIS COMPROBANTES EMITIDOS'
_sheet.getCell(1, 1).style = { alignment: { vertical: 'middle', horizontal: 'center' },fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'aad08e' } } };
_sheet.mergeCells('R1:AK1');
_sheet.getCell(1, 18).value = '.                                             DATOS AUXILIARES PARA IMPORTACIÓN HOLISTOR                                                         .'
_sheet.getCell(1, 18).style = { fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'fff2cc' } } };

for (let i = 0; i < columns.length; i++) {
  _sheet.getCell(2, i+1).value = columns[i].value;
  _sheet.getCell(2, i+1).style = { fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: columns[i].backgroundColor } } };
  _sheet.getColumn(i+1).style = { numFmt: columns[i].format ?? 'General' };
  _sheet.getColumn(i+1).width = charsToWidth(columns[i].chars);
}

_sheet.getRows(1, 2)?.forEach(row => {
  row.height = 30;
  row.font = { name: 'Courier New', size: 10 };
  row.alignment = { vertical: 'middle' };

})

function excel() {
  return _excel;
}

function prn(_sheet: Worksheet) {
  let _prn = 'Datos origen copia desde AFIP - MIS COMPROBANTES EMITIDOS                                         .                                             DATOS AUXILIARES PARA IMPORTACIÓN HOLISTOR\n\n'
  _sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    for (let colNumber = 1; colNumber <= columns.length; colNumber++) {
      const cell = row.getCell(colNumber);      
      const maxChars = columns[colNumber - 1].chars;
      let str = String((<any>cell.value)?.result ?? cell.value ?? '');
      if (rowNumber > 2 && columns[colNumber - 1].format === '0.00') {
        str = transformNumber(str, 2);
      }
      if (rowNumber > 2 && columns[colNumber - 1].format === '0.000') {
        str = transformNumber(str, 3);
      }
      if (columns[colNumber - 1].hideContent) str = '';
      str = str.slice(0, maxChars);
      if (columns[colNumber - 1].pad === 'right') {
        _prn += str.padStart(maxChars, ' ')
      } else {
        _prn += str.padEnd(maxChars, ' ')
      }
    }
    _prn += '\n'
  })
  return _prn
}

function charsToWidth(chars: number) {
  // 1 -> 1.8
  // 2 y 3 -> 1.4
  // 4 al 7 -> 1.24
  // 8 y 9 -> 1.1
  // 10 al 34 -> 1.05
  // 35 al 57 -> 1.03

  if (chars <= 0) return 0 * chars;
  if (chars === 1) return 1.8 * chars;
  if (chars <= 3) return 1.4 * chars;
  if (chars <= 7) return 1.24 * chars;
  if (chars <= 9) return 1.1 * chars;
  if (chars <= 19) return 1.08 * chars;
  if (chars <= 34) return 1.05 * chars;
  if (chars <= 57) return 1.03 * chars;
  throw new Error('chars > 57');
}

function transformNumber(numero: string | number, decimal: number = 2) {
  let float = parseFloat(String(numero));
  if (isNaN(float)) float = 0;
  const number = float.toFixed(decimal);
  const formatedNumber = number.replace('.', ',');
  return formatedNumber;
}


export const holistorSalesImport = {
  excel: excel,
  prn: prn,
  charsToWidth: charsToWidth,
  transformNumber: transformNumber
}