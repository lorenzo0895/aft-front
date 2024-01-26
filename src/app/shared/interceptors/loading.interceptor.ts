import { ApplicationRef, ChangeDetectorRef, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '@shared/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private _countRequest = 0;
  constructor(private _loadingService: LoadingService, private ref: ApplicationRef) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this._countRequest++;
    if (this._countRequest === 1) this._loadingService.set(true);
    return next.handle(request).pipe(
      finalize(() => {
        this._countRequest--;
        if (!this._countRequest) this._loadingService.set(false);
      })
    );
  }
}
