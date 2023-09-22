import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConceptItemsService extends BaseHttpService {

  constructor() {
    super(environment.apiUrl + '/concept-items')
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

  close(id: number) {
    return this._http.patch(this._url + '/close/' + id, {});
  }

  open(id: number) {
    return this._http.patch(this._url + '/open/' + id, {});
  }
}
