import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ChequesService extends BaseHttpService {

  constructor() {
    super(environment.apiUrl + '/cheques')
  }

}
