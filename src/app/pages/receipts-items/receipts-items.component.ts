import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConceptItemsService } from '@shared/services/concept-items.service';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { defaultGridOptions } from '@shared/constants/agGrid';
import { CellDoubleClickedEvent, ColDef } from 'ag-grid-community';
import { colDefs } from './constants/agGrid';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '@shared/components/modal/modal.service';
import { openCloseModalData, searchModalData } from './constants/modals';
import { InfoPageService } from '@shared/services/info-page.service';
import moment from 'moment';
import { ExcelService } from '@shared/services/excel.service';
import { ConceptsService } from '@shared/services/concepts.service';
import { AuthService } from '@shared/services/auth.service';
import { MessageService } from 'primeng/api';
import { ChipModule } from 'primeng/chip';
import { ClientsService } from '@shared/services/clients.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-receipts-items',
  standalone: true,
  imports: [ButtonModule, AgGridModule, ChipModule],
  templateUrl: './receipts-items.component.html',
  styleUrls: ['./receipts-items.component.scss'],
})
export class ReceiptsItemsComponent implements OnInit {
  @ViewChild('agGrid', { static: true }) agGrid!: AgGridAngular;
  colDefs: ColDef[] = colDefs(this);
  rowData: any[] = [];
  gridOptions = { ...defaultGridOptions };
  concepts: any[] = [];
  clients = new BehaviorSubject<any[]>([]);
  filterModel: any = {
    date: undefined,
    client: undefined,
  };

  constructor(
    private _router: Router,
    public authService: AuthService,
    private _modalService: ModalService,
    private _excel2Service: ExcelService,
    private _activatedRoute: ActivatedRoute,
    private _messageService: MessageService,
    private _clientsService: ClientsService,
    private _infoPageService: InfoPageService,
    private _conceptsService: ConceptsService,
    private _conceptItemsService: ConceptItemsService
  ) {}

  ngOnInit() {
    this._conceptsService.getData().subscribe((res) => (this.concepts = res));
    this._clientsService.getData().subscribe((res) => this.clients.next(res));
    this._activatedRoute.queryParams.subscribe((params) => {
      if (params['start']) {
        this.filterModel = {
          ...this.filterModel,
          date: [moment(params['start']), moment(params['end'])],
        };
        this.onSearch();
      } else {
        this.onSearch(1000);
      }
    });
  }

  onCreate() {}

  onOpenSearchModal() {
    const dialogRef = this._modalService.open(searchModalData(this));
    dialogRef.componentInstance.onSubmit.subscribe((res) => {
      this.filterModel = res;
      this.onSearch();
    });
  }

  onSearch(take?: number) {
    this._conceptItemsService
      .getData({ ...this.filterModel, take: take })
      .subscribe((res) => {
        this.rowData = res;
      });
  }

  goToReceipt(e: CellDoubleClickedEvent) {
    this._router.navigate(['..', 'receipts', e.data.receipt.id], {
      relativeTo: this._activatedRoute,
    });
  }

  onExport() {
    const array = this.rowData.map((row) => {
      const client = row.receipt?.client;
      const day = row.receipt?.day?.day;
      return {
        number: row.receipt.number,
        day: new Date(day),
        client: client.surname
          ? client.surname + ', ' + client.name
          : client.name,
        description: row.receipt.description,
        amount: row.amount,
        concept: row.concept.value,
      };
    });
    const now = moment();
    const date = now.format('DD.MM.YYYY HH.mm');
    // this._excel2Service.jsonToExcel(array, 'Reporte ' + date + '.xlsx').subscribe()
    this._excel2Service
      .exportConcepts(
        this.concepts.map((it) => it.description),
        array,
        'Reporte ' + date + '.xlsx'
      )
      .subscribe();
    // this._excelService.jsonToExcel(array, 'Reporte ' + date + '.xlsx');
  }

  onClose(row: any) {
    const dialogRef = this._modalService.open(openCloseModalData('close'));
    dialogRef.componentInstance.onSubmit.subscribe((res) => {
      this._conceptItemsService.close(row.id).subscribe((res) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Cambios guardados exitosamente',
        });
        this.rowData = this.rowData.map((it) => {
          return it.id === row.id ? { ...it, isActive: false } : it;
        });
      });
    });
  }

  onReopen(row: any) {
    const dialogRef = this._modalService.open(openCloseModalData('open'));
    dialogRef.componentInstance.onSubmit.subscribe((res) => {
      this._conceptItemsService.open(row.id).subscribe((res) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Cambios guardados exitosamente',
        });
        this.rowData = this.rowData.map((it) => {
          return it.id === row.id ? { ...it, isActive: true } : it;
        });
      });
    });
  }

  onRemove(target: 'date' | 'client') {
    if (target === 'date') {
      this.filterModel = {
        ...this.filterModel,
        date: undefined,
      };
    } else if (target === 'client') {
      this.filterModel = {
        ...this.filterModel,
        client: undefined,
      };
    }
    const take =
      !this.filterModel.date && !this.filterModel.client ? 1000 : undefined;
    this.onSearch(take);
  }
}
