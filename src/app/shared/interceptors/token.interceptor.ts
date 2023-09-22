import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }
    this._authService.updateObservables();
    return next.handle(request);
  }
}
