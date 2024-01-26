import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeneralConfigsService {
  private _url = environment.apiUrl + '/general-configs';

  constructor(private _http: HttpClient) {}

  getData() {
    return this._http.get<any[]>(this._url);
  }

  update(configs: {[key: string]: string}) {
    const array = Object.entries(configs).reduce((acc, [key, value]) => {
      return [...acc, { key, value }];
    }, [] as { key: string, value: string }[])
    return this._http.patch<any[]>(this._url, { generalConfigs: array });
  }

}
