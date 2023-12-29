import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { colDefs } from './constants/agGrid';
import { defaultGridOptions } from '@shared/constants/agGrid';
import { UsersService } from '@shared/services/users.service';
import { AuthService } from '@shared/services/auth.service';
import { ModalService } from '@shared/components/modal/modal.service';
import { passwordModalData, userModalData } from './constants/modals';
import { UxService } from '@shared/services/ux.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ButtonModule, AgGridModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  rowData: any[] = [];
  colDefs: ColDef[] = colDefs(this);
  gridOptions: GridOptions = { ...defaultGridOptions };
  subscription!: Subscription;

  constructor(
    public authService: AuthService,
    private _usersService: UsersService,
    private _modalService: ModalService,
    private _uxService: UxService,
  ) {}

  ngOnInit(): void {
    this.subscription = this._uxService.isMobile$.subscribe(isMobile => {
      this.colDefs = colDefs(this, isMobile);
    })
    this._usersService.getData().subscribe((res) => (this.rowData = res));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onCreate() {
    const dialogRef = this._modalService.open(userModalData());
    dialogRef.componentInstance.onSubmit.subscribe((res) => {
      this._usersService.create(res).subscribe((newUser) => {
        this.rowData = [...this.rowData, newUser];
      });
    });
  }

  openEdit(row: any) {
    const dialogRef = this._modalService.open(userModalData(row));
    dialogRef.componentInstance.onSubmit.subscribe((res) => {
      this._usersService.edit(row.id, res).subscribe(() => {
        this.rowData = this.rowData.map((it) => (row.id === it.id ? res : it));
        dialogRef.close();
      });
    });
  }

  changePassword(row: any) {
    const dialogRef = this._modalService.open(passwordModalData);
    dialogRef.componentInstance.onSubmit.subscribe((res) => {
      this._usersService.edit(row.id, res).subscribe(() => {
        dialogRef.close();
      });
    });
  }
}
