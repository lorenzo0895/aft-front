import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseHttpService {
  constructor() {
    super(environment.apiUrl + '/users');
  }
}
