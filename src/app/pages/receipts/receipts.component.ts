import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ReceiptsService } from 'src/app/shared/services/receipts.service';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { defaultGridOptions } from 'src/app/shared/constants/agGrid';
import { ColDef, GridOptions } from 'ag-grid-community';
import { colDefs } from './constants/agGrid';
import {
  closeModalData,
  newModalData,
  openModalData,
  searchModalData,
} from './constants/modals';
import { ButtonModule } from 'primeng/button';
import { FormlyModule } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ChequesService } from '@shared/services/cheques.service';
import { AuthService } from '@shared/services/auth.service';
import { ClientsService } from '@shared/services/clients.service';
import { ChipModule } from 'primeng/chip';
import * as moment from 'moment';
import { DaysService } from '@shared/services/days.service';

@Component({
  selector: 'app-receipts',
  standalone: true,
  imports: [CommonModule, AgGridModule, ButtonModule, FormlyModule, ChipModule],
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss'],
})
export class ReceiptsComponent implements OnInit {
  colDefs: ColDef[] = colDefs(this);
  rowData: any[] = [];
  gridOptions: GridOptions = { ...defaultGridOptions };
  cheques = new BehaviorSubject<any[]>([]);
  days = new BehaviorSubject<any[]>([]);
  clients = new BehaviorSubject<any[]>([]);
  filterModel: any = {
    date: undefined,
    client: undefined,
  };

  constructor(
    private _router: Router,
    public authService: AuthService,
    private _modalService: ModalService,
    private _chequesService: ChequesService,
    private _activatedRoute: ActivatedRoute,
    private _receiptsService: ReceiptsService,
    private _clientsService: ClientsService,
    private _daysService: DaysService
  ) {}

  ngOnInit(): void {
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
    this._daysService
      .getActiveDaysOptions()
      .subscribe((res) => this.days.next(res));
  }

  onCreate() {
    this._chequesService.getData('?onlyActive=true').subscribe((res) => {
      this.cheques.next(res);
    });
    const dialogRef = this._modalService.open(newModalData(this));
    dialogRef.componentInstance.onSubmit.subscribe((res) => {
      this._receiptsService
        .create({ ...res, user: this.authService.user$.value.id })
        .subscribe((res) => {
          dialogRef.close();
          this._router.navigate([res.id], { relativeTo: this._activatedRoute });
        });
    });
  }

  onDetails(rowData: any) {
    this._router.navigate([rowData.id], { relativeTo: this._activatedRoute });
  }

  onOpenSearchModal() {
    const dialogRef = this._modalService.open(searchModalData(this));
    dialogRef.componentInstance.onSubmit.subscribe((res) => {
      this.filterModel = res;
      this.onSearch();
    });
  }

  onSearch(take?: number) {
    this._receiptsService
      .getData({ ...this.filterModel, take: take })
      .subscribe((res) => (this.rowData = res));
  }

  onClose(row: any) {
    const dialogRef = this._modalService.open(closeModalData);
    dialogRef.componentInstance.onSubmit.subscribe((res) => {
      this._receiptsService.close(row.id).subscribe(() => {
        this.rowData = this.rowData.map((it) => {
          return it.id === row.id ? { ...it, isActive: false } : it;
        });
        dialogRef.close();
      });
    });
  }

  onOpen(row: any) {
    const dialogRef = this._modalService.open(openModalData);
    dialogRef.componentInstance.onSubmit.subscribe((res) => {
      this._receiptsService.open(row.id).subscribe(() => {
        this.rowData = this.rowData.map((it) => {
          return it.id === row.id
            ? { ...it, isActive: true, isCancelled: false }
            : it;
        });
        dialogRef.close();
      });
    });
  }

  onPrint(rowData: any) {
    this._router.navigate([rowData.id, 'print'], {
      relativeTo: this._activatedRoute,
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
