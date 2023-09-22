import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ClientsService } from 'src/app/shared/services/clients.service';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { clientModalData } from './constants/modals';
import { ButtonModule } from 'primeng/button';
import { ColDef, GridOptions } from 'ag-grid-community';
import { colDefs } from './constants/agGrid';
import { defaultGridOptions } from 'src/app/shared/constants/agGrid';
import { AgGridModule } from 'ag-grid-angular';
import { AuthService } from '@shared/services/auth.service';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { fields } from './constants/formly';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ButtonModule,
    AgGridModule,
    FormlyModule,
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  set rowData(value: any[]) {
    this._rawRowData = value;
    this._rowData = !this.model.onlyActive ? value : value.filter(it => it.isActive);
  }
  get rowData() {
    return this._rawRowData;
  }
  protected _rawRowData: any[] = [];
  protected _rowData: any[] = [];
  colDefs: ColDef[] = colDefs(this);
  gridOptions: GridOptions = { ...defaultGridOptions };
  fields: FormlyFieldConfig[] = fields;
  model: any = { onlyActive: undefined };

  constructor(
    private _clientsService: ClientsService,
    private _modalService: ModalService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this._clientsService.getData().subscribe((res) => {
      this.rowData = res;
    });
  }

  onCreate() {
    const dialogRef = this._modalService.open(clientModalData());
    dialogRef.componentInstance.onSubmit.subscribe((res) => {
      this._clientsService.create(res).subscribe((newClient) => {
        this.rowData = [...this.rowData, newClient].sort((v1, v2) =>
          v1.name < v2.name ? -1 : 1
        );
        dialogRef.close();
      });
    });
  }

  openEdit(row: any) {
    const dialogRef = this._modalService.open(clientModalData(row));
    dialogRef.componentInstance.onSubmit.subscribe((res) => {
      this._clientsService.edit(row.id, res).subscribe(() => {
        this.rowData = this.rowData.map((it) => {
          return it.id === row.id ? res : it;
        });
        dialogRef.close();
      });
    });
  }

  whatsapp(row: any) {
    window.open(`https://wa.me/${row.phone}`, '_blank')
  }
}
