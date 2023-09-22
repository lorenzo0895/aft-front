import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseHttpService } from './base-http.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ClientsService extends BaseHttpService {
  constructor() {
    super(environment.apiUrl + '/clients');
  }

  override getData(extraUrl?: string): Observable<any> {
    return super.getData(extraUrl).pipe(
      map((res) =>
        res.map((it: any) => {
          return { ...it, isActive: Boolean(it.isActive) };
        })
      )
    );
  }

  getActiveClientsOptions() {
    return this._http.get<any[]>(this._url + '?isActive=true').pipe(
      map((res) => res.filter((it) => it.isActive)),
      map((clients: any[]) =>
        clients.map((client) => {
          return {
            label: client.surname
              ? client.surname + ', ' + client.name
              : client.name,
            value: client.id,
          };
        })
      ),
      map((clients: any[]) =>
        clients.sort((a: any, b: any) => (a.label > b.label ? 1 : -1))
      )
    );
  }
}
