import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReceiptsService } from './receipts.service';
import { map } from 'rxjs';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  private _url = environment.apiUrl + '/billings';

  constructor(
    private _http: HttpClient,
    private _receiptsService: ReceiptsService,
  ) {}

  getLastInvoices(salePoint: number) {
    return this._http.post<any[]>(this._url + '/getInvoices', {
      limit: 100,
      salePoint: salePoint,
      type: 1,
    }).pipe(
      map((x: any) => x.sort((a: any, b: any) => b.CbteDesde - a.CbteDesde)),
    );
  }

  getImported(salePoint: number) {
    return this._http.get<any[]>(`${this._url}?salePoint=${salePoint}`);
  }

  getForImport() {
    return this._receiptsService.exportSales({
      start: moment().subtract(2, 'month').format('YYYY-MM-DD'),
      end: moment().format('YYYY-MM-DD'),
    }).pipe(
      map((x) => x.sort((a, b) => b.id - a.id)),
    )
  }

  import(vouchers: any[]) {
    return this._http.post<any[]>(this._url, { vouchers });
  }

  generateCAE(generateCae: any) {
    return this._http.post<any>(this._url + '/generate-cae', generateCae);
  }

  delete(ids: number[]) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this._http.delete<{success: number[], error: number[]}>(this._url, { 
      headers: headers,
      body: { ids }
    });
  }
}
