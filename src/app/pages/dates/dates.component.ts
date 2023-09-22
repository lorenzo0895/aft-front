import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { colDefs } from './constants/agGrid';
import { defaultGridOptions } from 'src/app/shared/constants/agGrid';
import { ButtonModule } from 'primeng/button';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { closeModalData, newModalData } from './constants/modals';
import { DaysService } from 'src/app/shared/services/days.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-dates',
  standalone: true,
  imports: [CommonModule, AgGridModule, ButtonModule],
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss'],
})
export class DatesComponent implements OnInit {
  colDefs: ColDef[] = colDefs(this);
  rowData: any[] = [];
  gridOptions: GridOptions = { ...defaultGridOptions };

  constructor(
    private _router: Router,
    public authService: AuthService,
    private _daysService: DaysService,
    private _modalService: ModalService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._daysService.getData('?full=true').subscribe((res) => {
      this.rowData = res;
    });
  }

  onCreate() {
    const dialogRef = this._modalService.open(newModalData(this));
    dialogRef.componentInstance.onSubmit.subscribe((res) => {
      if (!res) return;
      this._daysService.create(res).subscribe((res) => {
        this.rowData.splice(0, 0, {
          ...res,
          receiptsQuantity: 0,
          totalReceived: 0,
        });
        this.rowData = [...this.rowData];
        dialogRef.close();
      });
    });
  }

  onClose(row: any) {
    const dialogRef = this._modalService.open(closeModalData);
    dialogRef.componentInstance.onSubmit.subscribe(() => {
      this._daysService.close(row.id).subscribe(() => {
        this.rowData = this.rowData.map((it) => {
          return it.id === row.id ? { ...it, isActive: false } : it;
        });
      });
    });
  }

  onOpen(row: any) {
    const dialogRef = this._modalService.open(closeModalData);
    dialogRef.componentInstance.onSubmit.subscribe(() => {
      this._daysService.open(row.id).subscribe(() => {
        this.rowData = this.rowData.map((it) => {
          return it.id === row.id ? { ...it, isActive: true } : it;
        });
      });
    });
  }

  onView(section: string, day: Date) {
    const date = new Date(day).toISOString().slice(0, 10);
    this._router.navigate(['..', section], {
      relativeTo: this._activatedRoute,
      queryParams: {
        start: date,
        end: date,
      },
    });
  }
}
