import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ConceptsService extends BaseHttpService {

  constructor() {
    super(environment.apiUrl + '/concepts')
  }
}
