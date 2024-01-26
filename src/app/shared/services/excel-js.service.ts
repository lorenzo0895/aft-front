import { Injectable } from '@angular/core';
import { CellValue, Column, Workbook, Worksheet } from 'exceljs';
import { Observable, catchError, concatMap, from, fromEvent, map, of, tap } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelJsService {

  private _type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  private _typePrn = 'text/plain';

  readFile(file: File): Observable<Workbook> {
    const reader = new FileReader();
    const obs$ = fromEvent(reader, 'load').pipe(
      map((event: any) => event.target.result),
      concatMap((buffer: any) => new Workbook().xlsx.load(buffer))
    )
    reader.readAsArrayBuffer(file);
    return obs$;
  }

  downloadExcel(workbook: Workbook, name = 'export'): Observable<{ status: boolean }> {
    return from(workbook.xlsx.writeBuffer()).pipe(
      map(buffer => {
        const blob = new Blob([buffer], { type: this._type });
        saveAs(blob, `${name}.xlsx`);
        return { status : true};
      }),
      catchError(() => of({ status : false }))
    )
  }

  downloadPrn(string: string, name = 'export'): Observable<{ status: boolean }> {
    try {
      const blob = new Blob([string], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `${name}.prn`);
      return of({ status : true });
    } catch (error) {
      return of({ status : false})
    }
  }

  getSheetData<T = any>(sheet: Worksheet): T[] {
    sheet.columns = (<CellValue[]>sheet.getRow(1).values).map((cell) => {
      return { header: cell, key: cell } as Partial<Column>;
    })
    const array: T[] = [];
    sheet.eachRow((row, i) => {
      if (i === 1) return;
      const obj: any = {}
      row.eachCell((cell, j) => {
        const key = sheet.getColumn(j).key;
        if (!key) return;
        obj[key] = cell.value;
      })
      array.push(obj);
    })
    return array;
  }
  
}
