import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class DaysService extends BaseHttpService {
  constructor() {
    super(environment.apiUrl + '/days');
  }

  getActiveDaysOptions() {
    return this._http.get<any[]>(this._url + '?onlyActive=true').pipe(
      map((days: any[]) =>
        days.map((day) => {
          return {
            label: moment(day.day).format('DD/MM/YYYY'),
            value: day.id,
          };
        })
      )
    );
  }

  close(id: number) {
    return this._http.patch(this._url + '/close/' + id, {}).pipe(
      tap({
        next: () => {
          this._messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Día cerrado exitosamente',
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
            detail: 'Día reabierto exitosamente',
          });
        },
      })
    );
  }

}
