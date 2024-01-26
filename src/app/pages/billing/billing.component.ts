import { Component, OnInit, computed, signal } from '@angular/core';
import { BillingService } from '@shared/services/billing.service';
import { AgGridModule } from 'ag-grid-angular';
import { colDefs, gridOptions } from './constants/agGrid';
import { ButtonModule } from 'primeng/button';
import { ModalService } from '@shared/components/modal/modal.service';
import {
  configsModalData,
  dateModalData,
  importModalData,
} from './constants/modals';
import { Observable, combineLatest, map, of } from 'rxjs';
import { IRowNode, IsRowSelectable } from 'ag-grid-community';
import { ClientsService } from '@shared/services/clients.service';
import { GeneralConfigsService } from '@shared/services/general-configs.service';
import { GeneralConfigsBilling } from './models/generalConfigs';
import moment from 'moment';
import { ExcelService } from '@shared/services/excel.service';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [AgGridModule, ButtonModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss',
})
export class BillingComponent implements OnInit {
  generalConfigs?: GeneralConfigsBilling;
  colDefs = colDefs(this);
  gridOptions = gridOptions;
  clients: any[] = [];
  importedRowData = signal<any[]>([]);
  lastInvoicesRowData = signal<any[]>([]);
  rowData = computed(() => [
    ...this.importedRowData(),
    ...this.lastInvoicesRowData(),
  ]);
  isRowSelectable: IsRowSelectable = (rowNode: IRowNode) => {
    return !rowNode.data.CodAutorizacion;
  };

  constructor(
    private clientsService: ClientsService,
    private billingService: BillingService,
    private modalService: ModalService,
    private generalConfigsService: GeneralConfigsService,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {
    this.generalConfigsService.getData().subscribe((generalConfigs) => {
      this.generalConfigs = {
        salePoint: Number(
          generalConfigs.find((x) => x.key === 'salePoint').value
        ),
        cuit: Number(generalConfigs.find((x) => x.key === 'cuit').value),
      };
      this.clientsService.getData().subscribe((clients) => {
        this.clients = clients;
        this.colDefs = colDefs(this);
        this.updaterowData();
      });
    });
  }

  updaterowData() {
    if (!this.generalConfigs?.salePoint) return;
    this.billingService
      .getLastInvoices(this.generalConfigs?.salePoint)
      .subscribe((lastInvoices) => {
        this.lastInvoicesRowData.set(lastInvoices);
      });
    this.billingService
      .getImported(this.generalConfigs.salePoint)
      .subscribe((imported) => {
        this.importedRowData.set(imported.map((x) => this.normalizeToAfip(x)));
      });
  }

  getLastInvoices(): Observable<any[]> {
    if (!this.generalConfigs?.salePoint) return of([]);
    return this.billingService.getLastInvoices(this.generalConfigs?.salePoint);
  }

  getImported(): Observable<any[]> {
    if (!this.generalConfigs?.salePoint) return of([]);
    return this.billingService
      .getImported(this.generalConfigs.salePoint)
      .pipe(map((res) => res.map((x) => this.normalizeToAfip(x))));
  }

  onImport() {
    const dialogRefImport = this.modalService.open(importModalData);
    dialogRefImport.componentInstance.onSubmit.subscribe((res) => {
      const dialogRefDate = this.modalService.open(dateModalData);
      dialogRefDate.componentInstance.onSubmit.subscribe((modalRes) => {
        const invoices = res.map((x: any) => {
          return {
            ...modalRes,
            cuit: x.cuit,
            net: Math.round((x.amount * 100) / 0.21) / 100,
            vat: x.amount,
            salePoint: this.generalConfigs?.salePoint,
          };
        });
        this.billingService.import(invoices).subscribe((importVouchers) => {
          this.importedRowData.update((x) => [
            ...importVouchers.map((y) => this.normalizeToAfip(y)),
            ...x,
          ]);
          dialogRefDate.close();
          dialogRefImport.close();
        });
      });
    });
  }

  normalizeToAfip(x: any) {
    return {
      ...x,
      PtoVta: x.salePoint,
      DocNro: x.cuit,
      CbteFch: x.date,
      FchVtoPago: x.datePayment,
      FchServDesde: x.dateFrom,
      FchServHasta: x.dateTo,
      Iva: {
        AlicIva: [
          {
            BaseImp: x.net,
            Importe: x.vat,
          },
        ],
      },
      Total: x.net + x.vat,
    };
  }

  onDelete(rows: any[]) {
    this.billingService.delete(rows.map((x) => x.id)).subscribe((result) => {
      this.importedRowData.update((rows) =>
        rows.filter((x) => !result.success.includes(x.id))
      );
    });
  }

  onGenerateCAE(rows: any[]) {
    this.billingService.generateCAE({ vouchers: rows }).subscribe((x) => {
      if (!this.generalConfigs?.salePoint) return;
      this.billingService
        .getLastInvoices(this.generalConfigs.salePoint)
        .subscribe((res) => {
          console.error(x.error);
          this.importedRowData.update((rows) => {
            return rows.filter((row) => !x.success[row.id]);
          });
          this.lastInvoicesRowData.set(res);
        });
    });
  }

  onSettings() {
    const dialogRef = this.modalService.open(
      configsModalData(this.generalConfigs)
    );
    dialogRef.componentInstance.onSubmit.subscribe((res) => {
      this.generalConfigsService.update(res).subscribe(() => {
        this.generalConfigs = res;
        this.importedRowData.set([]);
        this.lastInvoicesRowData.set([]);
        this.updaterowData();
        dialogRef.close();
      });
    });
  }

  onExport() {
    this.excelService
      .exportInvoices(
        this.rowData().map((x) => {
          return {
            ...x,
            number: function() {
              if (!x.CbteDesde) return `${String(x.PtoVta).padStart(4, '0')}-XXXXXXXX`;
              return String(x.PtoVta).padStart(4, '0') + '-' + String(x.CbteDesde).padStart(8, '0')
            }(),
            client: (() => {
              const client = this.clients.find(y => y.cuit === x.DocNro);
              return client
                ? (client.surname ? `${client.surname}, ${client.name}` : client.name)
                : '';
            })(),
            CbteFch: moment(x.CbteFch, 'YYYYMMDD').format('DD/MM/YYYY'),
            FchVtoPago: moment(x.FchVtoPago, 'YYYYMMDD').format('DD/MM/YYYY'),
            FchServDesde: moment(x.FchServDesde, 'YYYYMMDD').format('DD/MM/YYYY'),
            FchServHasta: moment(x.FchServHasta, 'YYYYMMDD').format('DD/MM/YYYY'),
            BaseImp: Number(x.Iva.AlicIva[0].BaseImp),
            Importe: Number(x.Iva.AlicIva[0].Importe),
            Total: Number(x.Iva.AlicIva[0].BaseImp) + Number(x.Iva.AlicIva[0].Importe),
          };
        }),
        'Facturacion'
      )
      .subscribe();
  }
}
