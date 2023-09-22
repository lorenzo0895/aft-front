import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
  deps: [HttpClientModule, MessageService],
})
export class BaseHttpService<T = any> {
  protected _http: HttpClient = inject(HttpClient);
  protected _messageService: MessageService = inject(MessageService);
  protected _url: string;

  constructor(@Inject(String) private readonly url: string) {
    this._url = url;
  }

  getData(extraUrl: string = ''): Observable<T[] | T> {
    return this._http.get<T[] | T>(this.url + extraUrl);
  }

  getOne(id: number | string, extraUrl: string = ''): Observable<T> {
    return this._http.get<T>(this.url + extraUrl + '/' + id);
  }

  create(body: T, extraUrl: string = ''): Observable<T> {
    return this._http.post<T>(this.url + extraUrl, body).pipe(tap({
      next: () => {
        this._messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Item creado exitosamente'
        })
      }
    }));
  }

  edit(id: number | string, body: T, extraUrl: string = ''): Observable<T> {
    return this._http.patch<T>(this.url + extraUrl + '/' + id, body).pipe(tap({
      next: () => {
        this._messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Cambios guardados exitosamente'
        })
      }
    }));
  }

  delete(id: number | string): Observable<void> {
    return this._http.delete<void>(this.url + '/' + id).pipe(tap({
      next: () => {
        this._messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Item elimindo exitosamente'
        })
      }
    }));
  }

}
