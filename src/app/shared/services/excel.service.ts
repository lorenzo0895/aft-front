import { Injectable } from '@angular/core';
import { Column, Workbook, Worksheet } from 'exceljs';
import * as moment from 'moment';
import { FileSaverService } from 'ngx-filesaver';
import { from, map } from 'rxjs';
import { ExcelJsService } from './excel-js.service';

export interface IConceptExport {
  number: string;
  day: Date;
  client: string;
  description: string;
  amount: number;
  concept: string;
}

export interface ICellRef {
  row: number;
  col: number;
}

const a: Partial<Column>[] = [
  { header: 'Fecha Emisión', key: 'date', width: 10, },
  { header: 'Cpbte', key: '', width: 10, },
  { header: 'Suc.', key: '', width: 10, },
  { header: 'Número ', key: 'numberFrom', width: 10, },
  { header: 'N° Hasta', key: '', width: 10, },
  { header: 'Cód. Autorización', key: '', width: 10, },
  { header: 'Tipo Doc. ', key: '', width: 10, },
  { header: 'CUIT', key: '', width: 10, },
  { header: 'Razón Social/Denominación Comprador', key: '', width: 10, },
  { header: 'Tipo Cbio.', key: '', width: 10, },
  { header: 'Moneda', key: '', width: 10, },
  { header: 'Neto Gravado', key: '', width: 10, },
  { header: 'Importes No Gravados', key: '', width: 10, },
  { header: 'Importes Exentos', key: '', width: 10, },
  { header: 'Otros Tributos', key: '', width: 10, },
  { header: 'IVA  Crédito', key: '', width: 10, },
  { header: 'Importe   Total', key: '', width: 10, },
  { header: 'Neto Gravado', key: '', width: 10, },
  { header: 'Importes No Gravados', key: '', width: 10, },
  { header: 'Importes Exentos', key: '', width: 10, },
  { header: 'IVA  Liquidado', key: '', width: 10, },
  { header: 'Importe   Total', key: '', width: 10, },
  { header: 'Pcia', key: '', width: 10, },
  { header: 'Neto Cód. ', key: '', width: 10, },
  { header: 'Alíc.', key: '', width: 10, },
  { header: 'Neto a importar', key: '', width: 10, },
  { header: 'IVA   Débito', key: '', width: 10, },
  { header: 'NG/EX  Cód.', key: '', width: 10, },
  { header: 'P/R Cód. ', key: '', width: 10, },
  { header: 'Perc./Ret.', key: '', width: 10, },
  { header: 'Pcia P/R', key: '', width: 10, },
  { header: 'Cód Cte', key: '', width: 10, },
  { header: 'Moneda', key: '', width: 10, },
  { header: 'Pto. Vta', key: '', width: 10, },
  { header: 'Cd Dc', key: '', width: 10, },
  { header: 'DIFERENCIA', key: '', width: 10, },
]

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  private EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  private totalBorders: any = {
    top: { style: 'thin' },
    bottom: { style: 'double' },
  };

  constructor(
    private fileSaver: FileSaverService,
    private excelService: ExcelJsService
  ) { }

  jsonToExcel(json: any[], fileName: string) {
    const headers = Array.from(new Set(json.flatMap((it) => Object.keys(it))));
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet');
    worksheet.columns = headers.map((header) => {
      return { header: header, key: header };
    });
    json.forEach((row) => {
      worksheet.addRow(row);
    });
    return from(workbook.xlsx.writeBuffer()).pipe(
      map((buffer) => {
        const blobData = new Blob([buffer], { type: this.EXCEL_TYPE });
        this.fileSaver.save(blobData, fileName);
      })
    );
  }

  exportConcepts(concepts: string[], json: IConceptExport[], fileName: string) {
    const headers = Array.from(new Set(json.flatMap((it) => Object.keys(it))));
    const workbook = new Workbook();
    const ws = workbook.addWorksheet('Sheet');

    // Paste concepts items
    ws.columns = [
      { header: 'Numero', key: 'number' },
      { header: 'Dia', key: 'day', width: 10.5 },
      { header: 'Cliente', key: 'client', width: 26 },
      { header: 'Descripcion', key: 'description', width: 26 },
      { header: 'Monto', key: 'amount' },
      { header: 'Concepto', key: 'concept', width: 26 },
    ];
    json.forEach((row) => {
      ws.addRow({ ...row });
    });

    // Make a summary
    ws.getCell('H1').value = 'Clasificación';
    ws.getCell('I1').value = 'Monto';
    for (let i = 0; i < concepts.length; i++) {
      const concept = ws.getCell(`H${i + 2}`);
      const sum = ws.getCell(`I${i + 2}`);
      concept.value = concepts[i];
      sum.value = {
        formula: `SUMIF(F:F,H${i + 2},E:E)`,
        date1904: false,
      };
      sum.numFmt = '#,##0.00';
    }
    ws.getCell(`H${concepts.length + 2}`).value = 'Total';
    ws.getCell(`I${concepts.length + 2}`).value = {
      formula: `SUM(I2:I${concepts.length + 1})`,
      date1904: false,
    };
    ws.getCell(`I${concepts.length + 2}`).numFmt = '#,##0.00';
    ws.getColumn('H').width = 26;
    ws.getColumn('I').width = 15;

    // Set borders
    this.setBorders(ws, { col: 1, row: 1 }, { col: 6, row: json.length + 1 });
    this.setBorders(
      ws,
      { col: 8, row: 1 },
      { col: 9, row: concepts.length + 2 }
    );

    return from(workbook.xlsx.writeBuffer()).pipe(
      map((buffer) => {
        const blobData = new Blob([buffer], { type: this.EXCEL_TYPE });
        this.fileSaver.save(blobData, fileName);
      })
    );
  }

  setBorders(worksheet: Worksheet, start: ICellRef, end: ICellRef) {
    for (let r = start.row; r <= end.row; r++) {
      for (let c = start.col; c <= end.col; c++) {
        const cell = worksheet.getCell(r, c);
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      }
    }
  }

  setNumberFormat(worksheet: Worksheet, start: ICellRef, end: ICellRef) {
    for (let r = start.row; r <= end.row; r++) {
      for (let c = start.col; c <= end.col; c++) {
        const cell = worksheet.getCell(r, c);
        cell.numFmt = '#,##0.00';
      }
    }
  }

  setBackgroundColor(worksheet: Worksheet, start: ICellRef, end: ICellRef, color: string) {
    for (let r = start.row; r <= end.row; r++) {
      for (let c = start.col; c <= end.col; c++) {
        const cell = worksheet.getCell(r, c);
        cell.style.fill = {
          type: 'pattern',
          pattern:'darkTrellis',
          fgColor: { argb:color },
          bgColor: { argb:color }
        };
      }
    }
  }

  minuta(concepts: any[], rows: any[], fileName: string) {
    const workbook = new Workbook();
    const ws = workbook.addWorksheet('Sheet');
    ws.columns = [
      { header: '#', key: 'number' },
      { header: 'Dia', key: 'day', width: 10.5 },
      { header: 'Cliente', key: 'client', width: 26 },
      { header: 'Descripción', key: 'description', width: 26 },
      { header: 'Efect.', key: 'cash', width: 10.5, hidden: true },
      { header: 'Trans.', key: 'transferAmount', width: 10.5, hidden: true },
      { header: 'Cheque', key: 'cheques', width: 10.5, hidden: true },
      { header: 'Cobrado', key: 'total', width: 10.5 },
      ...concepts.map((it) => {
        return { header: it.value, key: 'concept_' + it.id };
      }),
    ];
    rows.forEach((row) => {
      let a: any = {
        number: row.number,
        day: new Date(row.day.day),
        client: row.client.surname
          ? row.client.surname + ', ' + row.client.name
          : row.client.name,
        description: row.description ?? '',
        cash: row.cash,
        transferAmount: row.transferAmount,
        cheques: [...row.cheques, ...row.cancelCheques].reduce(
          (acc: number, curr: any) => {
            return acc + curr.amount;
          },
          0
        ),
      };
      if (row.cancelReceipt) {
        a = {
          ...a,
          cash: -a.cash,
          transferAmount: -a.transferAmount,
          cheques: -a.cheques,
        };
      }
      row.conceptItems.forEach((c: any) => {
        a = {
          ...a,
          ['concept_' + c.concept.id]:
            (a?.['concept_' + c.concept.id] ?? 0) + c.amount,
        };
      });
      ws.addRow(a);
    });

    ws.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        ws.getCell(`H${rowNumber}`).value = {
          formula: `SUM(E${rowNumber}:G${rowNumber})`,
          date1904: false,
        };
      }
    });

    const totalsRow = ws.lastRow!.number + 2;
    const lastColumn = ws.lastColumn!.number;

    // Set totals
    for (let col = 5; col <= lastColumn; col++) {
      const cell = ws.getCell(totalsRow, col);
      const columnLetter = ws.getColumn(cell.col).letter;
      cell.value = {
        formula: `SUM(${columnLetter}1:${columnLetter}${totalsRow - 2})`,
        date1904: false,
      };
      cell.border = this.totalBorders;
    }
    this.setNumberFormat(
      ws,
      { col: 5, row: 2 },
      { col: lastColumn, row: totalsRow }
    );

    // Set other keys
    ws.getCell('A' + (totalsRow + 3)).value = 'Total cobrado';
    ws.getCell('A' + (totalsRow + 4)).value = 'Total 3eros';
    ws.getCell('A' + (totalsRow + 5)).value = 'Total Débito Fiscal';
    ws.getCell('A' + (totalsRow + 6)).value = 'Total Honorarios';
    ws.getCell('A' + (totalsRow + 7)).value = 'Diferencia';
    ws.getCell('A' + (totalsRow + 9)).value = 'PENDIENTES DE PAGO';
    ws.getCell('A' + (totalsRow + 10)).value = 'Pagado en Banco';
    ws.getCell('A' + (totalsRow + 11)).value = 'Pagado en Banco';
    ws.getCell('A' + (totalsRow + 12)).value = 'Pagado en Banco';
    ws.getCell('A' + (totalsRow + 13)).value = 'Saldos Pendientes de Pago';

    ws.getCell('C' + (totalsRow + 3)).value = {
      formula: `H${totalsRow}`,
      date1904: false,
    };
    const ownFee: Column[] = [];
    const otherConcepts: Column[] = [];
    const fiscalDebits: Column[] = [];
    concepts.forEach((concept) => {
      if (concept.id === 6) {
        fiscalDebits.push(ws.getColumnKey('concept_' + concept.id));
      } else if (concept.isOwnFee) {
        ownFee.push(ws.getColumnKey('concept_' + concept.id));
      } else {
        otherConcepts.push(ws.getColumnKey('concept_' + concept.id));
      }
    });

    ws.getCell('C' + (totalsRow + 4)).value = {
      formula: `SUM(${otherConcepts
        .map((it) => {
          return it.letter + totalsRow;
        })
        .join(',')})`,
      date1904: false,
    };
    ws.getCell('C' + (totalsRow + 5)).value = {
      formula: `${fiscalDebits[0].letter}${totalsRow}`,
      date1904: false,
    };
    ws.getCell('C' + (totalsRow + 6)).value = {
      formula: `SUM(${ownFee
        .map((it) => {
          return it.letter + totalsRow;
        })
        .join(',')})`,
      date1904: false,
    };
    const dif = ws.getCell('C' + (totalsRow + 7));
    dif.value = {
      formula: `C${totalsRow + 3}-C${totalsRow + 4}-C${totalsRow + 5}-C${totalsRow + 6}`,
      date1904: false,
    };
    dif.border = this.totalBorders;
    this.setNumberFormat(
      ws,
      { col: 3, row: totalsRow + 3 },
      { col: 3, row: totalsRow + 6 }
    );

    return from(workbook.xlsx.writeBuffer()).pipe(
      map((buffer) => {
        const blobData = new Blob([buffer], { type: this.EXCEL_TYPE });
        this.fileSaver.save(blobData, fileName);
      })
    );
  }

  xubio(rows: any[], model: any, fileName: string) {
    let id = Number(model.firstNumber);
    let day = moment(model.emitDate).format('DD/MM/YYYY');
    const workbook = new Workbook();
    const ws = workbook.addWorksheet('Sheet');
    ws.columns = [
      { header: 'NUMERODECONTROL', key: 'NUMERODECONTROL' },
      { header: 'CLIENTE', key: 'CLIENTE' },
      { header: 'TIPO', key: 'TIPO' },
      { header: 'NUMERO', key: 'NUMERO' },
      { header: 'FECHA', key: 'FECHA' },
      { header: 'VENCIMIENTODELCOBRO', key: 'VENCIMIENTODELCOBRO' },
      { header: 'COMPROBANTEASOCIADO', key: 'COMPROBANTEASOCIADO' },
      { header: 'MONEDA', key: 'MONEDA' },
      { header: 'COTIZACION', key: 'COTIZACION' },
      { header: 'OBSERVACIONES', key: 'OBSERVACIONES' },
      { header: 'PRODUCTOSERVICIO', key: 'PRODUCTOSERVICIO' },
      { header: 'CENTRODECOSTO', key: 'CENTRODECOSTO' },
      { header: 'PRODUCTOOBSERVACION', key: 'PRODUCTOOBSERVACION' },
      { header: 'CANTIDAD', key: 'CANTIDAD' },
      { header: 'PRECIO', key: 'PRECIO' },
      { header: 'DESCUENTO', key: 'DESCUENTO' },
      { header: 'IMPORTE', key: 'IMPORTE' },
      { header: 'IVA', key: 'IVA' },
    ];
    rows.forEach((row) => {
      const obj = {
        NUMERODECONTROL: id,
        CLIENTE: row.clientSurname
          ? row.clientName + ' ' + row.clientSurname
          : row.clientName,
        TIPO: 1,
        NUMERO: 'A-00005-' + String(id).padStart(8, '0'),
        FECHA: day,
        VENCIMIENTODELCOBRO: day,
        MONEDA: 'Pesos Argentinos',
      };
      ws.addRow(obj);
      const amount = Number(row.amount);
      const obj2 = {
        NUMERODECONTROL: id,
        PRODUCTOSERVICIO: 'Honorarios Profesionales',
        CANTIDAD: 1,
        PRECIO: Math.round((amount * 100) / 0.21) / 100,
        IMPORTE: Math.round((amount * 100) / 0.21) / 100,
        IVA: amount,
      };
      ws.addRow(obj2);
      id++;
    });

    return from(workbook.xlsx.writeBuffer()).pipe(
      map((buffer) => {
        const blobData = new Blob([buffer], { type: this.EXCEL_TYPE });
        this.fileSaver.save(blobData, fileName);
      })
    );
  }

  holistorVtaGeneral(file: File) {
    this.excelService.readFile(file).subscribe((book) => {
      const sheet = book.getWorksheet(1);
      if (!sheet) return;
      const bookExp = new Workbook();
      const sheetExp = bookExp.addWorksheet('Comprobantes Ventas');
      sheetExp.columns = a;
      this.setBackgroundColor(sheetExp, { col: 1, row: 1 }, { col: 17, row: 1 }, 'fffcd6b4');
      this.setBackgroundColor(sheetExp, { col: 18, row: 1 }, { col: 22, row: 1 }, 'fffccc99');
      this.setBackgroundColor(sheetExp, { col: 23, row: 1 }, { col: 23, row: 1 }, 'ffccffcc');
      this.setBackgroundColor(sheetExp, { col: 24, row: 1 }, { col: 24, row: 1 }, 'ffffff99');
      this.setBackgroundColor(sheetExp, { col: 25, row: 1 }, { col: 27, row: 1 }, 'fffccc99');
      this.setBackgroundColor(sheetExp, { col: 28, row: 1 }, { col: 28, row: 1 }, 'ffff99cc');
      this.setBackgroundColor(sheetExp, { col: 29, row: 1 }, { col: 31, row: 1 }, 'ffcc99ff');
      this.setBackgroundColor(sheetExp, { col: 32, row: 1 }, { col: 36, row: 1 }, 'ffccffcc');
      sheetExp.getRow(1).height = 50;

      this.excelService.downloadExcel(bookExp, 'HWVTAFIP');
    });
  }
}