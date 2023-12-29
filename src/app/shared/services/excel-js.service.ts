import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { Observable, concatMap, from, fromEvent, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelJsService {

  private _type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  readFile(file: File): Observable<Workbook> {
    const reader = new FileReader();
    const obs$ = fromEvent(reader, 'load').pipe(
      map((event: any) => event.target.result),
      concatMap((buffer: any) => new Workbook().xlsx.load(buffer))
    )
    reader.readAsArrayBuffer(file);
    return obs$;
  }

  downloadExcel(workbook: Workbook, name = 'export') {
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: this._type });
      saveAs(blob, `${name}.xlsx`);
    });
  }
  
}
