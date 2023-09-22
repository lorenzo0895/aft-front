import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from './loading.service';
import { finalize, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService extends BaseHttpService {
  constructor(private _loadingService: LoadingService) {
    super(environment.apiUrl + '/utils');
  }

  liqPrimGranos(files: any[]) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    return this._http
      .post(this._url + '/liquidacionPrimariaGranos', formData)
      .pipe(
        tap(() => this._loadingService.set(true)),
        finalize(() => this._loadingService.set(false)),
      );
  }
}
