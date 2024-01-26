import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseHttpService } from './base-http.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReceiptsService extends BaseHttpService {
  constructor() {
    super(environment.apiUrl + '/receipts');
  }

  override getData(body: any): Observable<any> {
    let query = '?';
    if (body.date) {
      query += `start=${body.date[0].format('YYYY-MM-DD')}&`;
      query += `end=${body.date[1].format('YYYY-MM-DD')}&`;
    }
    if (body.client) query += `client=${body.client.value}&`;
    if (body.take) query += `take=${body.take}`
    return this._http.get(this._url + query);
  }

  minuta(query: any): Observable<any[]> {
    return this._http.get<any[]>(
      `${this._url}/report/minuta?start=${query.start}&end=${query.end}&orderBy=${query.orderBy}&client=${query.client}`
    );
  }

  exportSales(query: any): Observable<any[]> {
    return this._http.get<any[]>(
      `${this._url}/report/xubio?start=${query.start}&end=${query.end}`
    );
  }

  updateDescription(id: number, description: string) {
    return this._http
      .patch(this._url + '/description/' + id, { description })
      .pipe(
        tap({
          next: () => {
            this._messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Item editado exitosamente',
            });
          },
        })
      );
  }

  open(id: number) {
    return this._http.patch(this._url + '/open/' + id, {}).pipe(
      tap({
        next: () => {
          this._messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Item reabierto exitosamente',
          });
        },
      })
    );
  }

  close(id: number) {
    return this._http.patch(this._url + '/close/' + id, {}).pipe(
      tap({
        next: () => {
          this._messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Item cerrado exitosamente',
          });
        },
      })
    );
  }

  cancel(id: number) {
    return this._http.patch(this._url + '/cancel/' + id, {}).pipe(
      tap({
        next: () => {
          this._messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Item revertido exitosamente',
          });
        },
      })
    );
  }
}
