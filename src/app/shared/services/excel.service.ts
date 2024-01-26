import { Injectable } from '@angular/core';
import { CellFormulaValue, Column, Workbook, Worksheet } from 'exceljs';
import moment from 'moment';
import { concatMap, from, map, of } from 'rxjs';
import { ExcelJsService } from './excel-js.service';
import { BalducchiSales } from '@shared/models/BalducchiSales';
import {
  compEmitidosHeader,
  comprobantesBalducchi,
  comprobantesEmitidosAfip,
} from '@shared/constants/facturacion';
import { HttpClient } from '@angular/common/http';
import { holistorSalesImport } from '@shared/constants/holistorSalesImport';

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

  constructor(private excelService: ExcelJsService, private http: HttpClient) {}

  // jsonToExcel(json: any[], fileName: string) {
  //   const headers = Array.from(new Set(json.flatMap((it) => Object.keys(it))));
  //   const workbook = new Workbook();
  //   const worksheet = workbook.addWorksheet('Sheet');
  //   worksheet.columns = headers.map((header) => {
  //     return { header: header, key: header };
  //   });
  //   json.forEach((row) => {
  //     worksheet.addRow(row);
  //   });
  //   return this.excelService.downloadExcel(workbook, fileName);
  // }

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

    return this.excelService.downloadExcel(workbook, fileName);
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

  exportInvoices(rowData: any[], fileName: string) {
    const workbook = new Workbook();
    const ws = workbook.addWorksheet('Sheet');

    // Paste concepts items
    ws.columns = [
      { header: 'Número', key: 'number' },
      { header: 'Fecha Comprobante', key: 'CbteFch' },
      { header: 'Fecha Vencimiento Pago', key: 'FchVtoPago' },
      { header: 'Fecha Servicio Desde', key: 'FchServDesde' },
      { header: 'Fecha Servicio Hasta', key: 'FchServHasta' },
      { header: 'CUIT', key: 'DocNro' },
      { header: 'Cliente', key: 'client' },
      { header: 'Base Imponible IVA', key: 'BaseImp', style: { numFmt: '#,##0.00' } },
      { header: 'Importe IVA', key: 'Importe', style: { numFmt: '#,##0.00' } },
      { header: 'Total', key: 'Total', style: { numFmt: '#,##0.00' } },
    ];
    rowData.forEach((row) => {
      ws.addRow({ ...row });
    });

    return this.excelService.downloadExcel(workbook, fileName);
  }

  setNumberFormat(worksheet: Worksheet, start: ICellRef, end: ICellRef) {
    for (let r = start.row; r <= end.row; r++) {
      for (let c = start.col; c <= end.col; c++) {
        const cell = worksheet.getCell(r, c);
        cell.numFmt = '#,##0.00';
      }
    }
  }

  setBackgroundColor(
    worksheet: Worksheet,
    start: ICellRef,
    end: ICellRef,
    color: string
  ) {
    for (let r = start.row; r <= end.row; r++) {
      for (let c = start.col; c <= end.col; c++) {
        const cell = worksheet.getCell(r, c);
        cell.style.fill = {
          type: 'pattern',
          pattern: 'darkTrellis',
          fgColor: { argb: color },
          bgColor: { argb: color },
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
      formula: `C${totalsRow + 3}-C${totalsRow + 4}-C${totalsRow + 5}-C${
        totalsRow + 6
      }`,
      date1904: false,
    };
    dif.border = this.totalBorders;
    this.setNumberFormat(
      ws,
      { col: 3, row: totalsRow + 3 },
      { col: 3, row: totalsRow + 6 }
    );

    return this.excelService.downloadExcel(workbook, fileName);
  }

  exportSales(rows: any[], model: any, fileName: string) {
    let day = moment(model.emitDate).format('DD/MM/YYYY');
    const workbook = new Workbook();
    const ws = workbook.addWorksheet('Sheet');
    ws.columns = [
      { header: 'FECHA', key: 'FECHA', width: 15 },
      { header: 'NUMERO', key: 'NUMERO', width: 20 },
      { header: 'CLIENTE', key: 'CLIENTE', width: 30 },
      { header: 'CUIT', key: 'CUIT', width: 17 },
      { header: 'PRODUCTOSERVICIO', key: 'PRODUCTOSERVICIO', width: 22 },
      { header: 'NETO', key: 'NETO', style: { numFmt: '#,##0.00' }, width: 15 },
      { header: 'IVA', key: 'IVA', style: { numFmt: '#,##0.00' }, width: 15 },
      {
        header: 'TOTAL',
        key: 'TOTAL',
        style: { numFmt: '#,##0.00' },
        width: 15,
      },
    ];
    rows.forEach((row, i) => {
      const amount = Number(row.amount);
      const obj = {
        CLIENTE: row.clientSurname
          ? row.clientName + ' ' + row.clientSurname
          : row.clientName,
        CUIT: row.cuit,
        NUMERO:
          model.salePoint +
          '-' +
          String(Number(model.firstNumber) + i).padStart(8, '0'),
        FECHA: day,
        PRODUCTOSERVICIO: 'Honorarios Profesionales',
        NETO: Math.round((amount * 100) / 0.21) / 100,
        IVA: amount,
        TOTAL: Math.round((amount * 100) / 0.21) / 100 + amount,
      };
      ws.addRow(obj);
    });

    return this.excelService.downloadExcel(workbook, fileName);
  }

  holistorVtaGeneral(file: File) {
    this.excelService.readFile(file).subscribe((book) => {
      const sheet = book.getWorksheet(1);
      if (!sheet) return;
      const bookExp = new Workbook();
      const sheetExp = bookExp.addWorksheet('Comprobantes Ventas');
      sheetExp.columns = compEmitidosHeader;
      this.setBackgroundColor(
        sheetExp,
        { col: 1, row: 1 },
        { col: 17, row: 1 },
        'fffcd6b4'
      );
      this.setBackgroundColor(
        sheetExp,
        { col: 18, row: 1 },
        { col: 22, row: 1 },
        'fffccc99'
      );
      this.setBackgroundColor(
        sheetExp,
        { col: 23, row: 1 },
        { col: 23, row: 1 },
        'ffccffcc'
      );
      this.setBackgroundColor(
        sheetExp,
        { col: 24, row: 1 },
        { col: 24, row: 1 },
        'ffffff99'
      );
      this.setBackgroundColor(
        sheetExp,
        { col: 25, row: 1 },
        { col: 27, row: 1 },
        'fffccc99'
      );
      this.setBackgroundColor(
        sheetExp,
        { col: 28, row: 1 },
        { col: 28, row: 1 },
        'ffff99cc'
      );
      this.setBackgroundColor(
        sheetExp,
        { col: 29, row: 1 },
        { col: 31, row: 1 },
        'ffcc99ff'
      );
      this.setBackgroundColor(
        sheetExp,
        { col: 32, row: 1 },
        { col: 36, row: 1 },
        'ffccffcc'
      );
      sheetExp.getRow(1).height = 50;

      this.excelService.downloadExcel(bookExp, 'HWVTAFIP').subscribe();
    });
  }

  transformarVtasBalducchi(file: File) {
    return this.excelService.readFile(file).pipe(
      concatMap((book) => {
        const sheet = book.getWorksheet(1);
        if (!sheet) return of({ status: false, omitted: [] });
        const sales = this.excelService.getSheetData<BalducchiSales>(sheet);

        const bookExp = new Workbook();
        const sheetExp = bookExp.addWorksheet('Comprobantes Ventas');
        sheetExp.columns = comprobantesEmitidosAfip;
        const arrayErrors: [number, any][] = [];

        sales.forEach((sale, i) => {
          try {
            const obj = {
              fecha: sale.FECHA,
              tipo: comprobantesBalducchi[sale.TIPOCOMP],
              puntoVenta: Number(sale.NCOMP.split('-')[0]),
              numeroDesde: Number(sale.NCOMP.split('-')[1]),
              numeroHasta: '',
              codAutorizacion: '',
              docReceptor: ['FTA', 'NCA', 'NDA'].includes(sale.TIPOCOMP) ? 'CUIT' : '',
              numeroDocReceptor: ['FTA', 'NCA', 'NDA'].includes(sale.TIPOCOMP) ? Number(sale.CUIT.replace(/-/g, '')) : '',
              denominacion: ['FTA', 'NCA', 'NDA'].includes(sale.TIPOCOMP) ? sale.NOMBRE : '',
              tipoCambio: 1,
              moneda: '$',
              gravado: sale.IMP_NETO,
              noGravado: sale.NGRAV,
              exento: 0,
              others: 0,
              iva: sale.IVA_CONTRA + sale.IVA_FAVOR,
              total: sale.IMP_TOTAL,
            };
            sheetExp.addRow(obj);
          } catch (error) {
            arrayErrors.push([i, sale]);
          }
        });
        sheetExp.insertRow(1, {});
        sheetExp.getCell(1, 1).value =
          'Mis Comprobantes Emitidos - CUIT 20060774103';
        sheetExp.getCell(1, 1).alignment = {
          vertical: 'middle',
          horizontal: 'center',
          wrapText: true,
        };
        sheetExp.mergeCells(1, 1, 1, 17);

        return this.excelService
          .downloadExcel(bookExp, 'Balducchi transformado')
          .pipe(map((x) => ({ status: x.status, omitted: arrayErrors })));
      })
    );
  }

  exportSalesAFIP(model: { files: FileList, neto: string, noGravado: string, netoYNoGravado: string }) {
    console.log(model);
    const _excel = holistorSalesImport.excel();
    const _sheet = _excel.getWorksheet(1);
    if (!_sheet) return;
    this.excelService.readFile(model.files[0]).subscribe((book) => {
      const importedSheet = book.getWorksheet(1);
      if (!importedSheet) return;
      importedSheet.eachRow((row, i) => {
        const getFormulaValue = (c: number): number => {
          return (<CellFormulaValue>_sheet.getCell(i, c).value).result as number;
        }
        if (i < 3) return;
        row.eachCell((cell, j) => {
          _sheet.getCell(i, j).value = cell.value;
        })
        const values = row.values as any;
        _sheet.getCell(`H${i}`).value = _sheet.getCell(`H${i}`).value || 0;
        _sheet.getCell(`R${i}`).value = { formula: `IF(L${i}>0,+L${i}*J${i},0)`, result: values[12] > 0 ? values[12] : values[12] * values[10] }
        _sheet.getCell(`S${i}`).value = { formula: `IF(M${i}>0,+M${i}*J${i},0)+(O${i}*J${i})`, result: (values[13] > 0 ? values[13] * values[10] : 0) + values[15] * values[10] }
        _sheet.getCell(`T${i}`).value = { formula: `IF(N${i}>0,+N${i}*J${i},0)`, result: values[14] > 0 ? values[14] * values[10] : 0 }
        _sheet.getCell(`U${i}`).value = { formula: `IF(P${i}>0,+P${i}*J${i},0)`, result: values[16] > 0 ? values[16] * values[10] : 0 }
        _sheet.getCell(`V${i}`).value = { formula: `IF(Q${i}>0,+Q${i}*J${i},0)`, result: values[17] > 0 ? values[17] * values[10] : 0 }
        _sheet.getCell(`AA${i}`).value = { formula: `IF(R${i}>0,P${i}*J${i},0)`, result: getFormulaValue(18) > 0 ? values[16] * values[10] : 0 }
        _sheet.getCell(`Y${i}`).value = { 
          formula: `IF(A${i}>0,IF(R${i}>0,ROUND(+AA${i}/R${i}*100,2),0),"    ")`,
          result: values[1] 
            ? (getFormulaValue(18) > 0 
              ? Math.round(getFormulaValue(27)/getFormulaValue(18) * 10000) / 100 
              : 0)
            : '    ' }
        if (i === 3) {
          console.log(values[1]);
          console.log(getFormulaValue(18));
          console.log(getFormulaValue(27));
          console.log(getFormulaValue(27));
        }
        _sheet.getCell(`AF${i}`).value = { formula: `SUBSTITUTE(LEFT(B${i},3)," -","")`, result: String(values[2]).match(/([0-9]+)\s-\s/)?.[1] }
        _sheet.getCell(`AG${i}`).value = { formula: `IF(K${i}="USD","DOL","   ")`, result: values[11] === 'USD' ? 'DOL' : '   ' }
        _sheet.getCell(`AH${i}`).value = { formula: `REPT("0",5-LEN(C${i}))&C${i}`, result: String(values[3]).padStart(5, '0') }
        const tipoComp: any = {
          CUIT: 80,
          CUIL: 86,
          DNI: 96,
          99: 99,
          PASAPORTE: 94,
          CDI: 87,
          'CI EXTRANJERA': 91,
          'OTRO': 99
        }
        _sheet.getCell(`AI${i}`).value = { formula: `IF(G${i}="CUIT",80,IF(G${i}="CUIL",86,IF(G${i}="DNI",96,IF(G${i}=99,99,IF(G${i}="PASAPORTE",94,IF(G${i}="CDI",87,IF(G${i}="CI EXTRANJERA",91,IF(G${i}="OTRO",99,99))))))))`, result: tipoComp[values[7]] ?? 99 }
        _sheet.getCell(`AJ${i}`).value = { 
          formula: `IF((R${i}+S${i}+T${i}+AA${i})>0,(+V${i}-R${i}-S${i}-T${i}-AA${i}),0)`,
          result:
            (getFormulaValue(18) + getFormulaValue(19) + getFormulaValue(20) + getFormulaValue(27)) > 0
              ? (getFormulaValue(22) - getFormulaValue(18) - getFormulaValue(19) - getFormulaValue(20) - getFormulaValue(27))
              : 0
        }

        _sheet.getCell(`Z${i}`).value = { 
          formula: `IF(R${i}>0,R${i},V${i}-S${i}-T${i}-AA${i}-AJ${i})`, 
          result: getFormulaValue(18) > 0 
            ? getFormulaValue(18) 
            : getFormulaValue(22) - getFormulaValue(20) - getFormulaValue(27) - getFormulaValue(36)
        }
        
        _sheet.getCell(`X${i}`).value = 
          getFormulaValue(18) > 0 && getFormulaValue(19) > 0
            ? model.netoYNoGravado 
            : (getFormulaValue(18) > 0 ? model.neto : '');
        _sheet.getCell(`AB${i}`).value = getFormulaValue(19) > 0 ? model.noGravado : '';

        _sheet.getRow(i).font = { name: 'Courier New', size: 8 };
      })
      
      
      this.excelService.downloadExcel(_excel).subscribe();
      this.excelService.downloadPrn(holistorSalesImport.prn(_sheet)).subscribe();
    })
  }
}
