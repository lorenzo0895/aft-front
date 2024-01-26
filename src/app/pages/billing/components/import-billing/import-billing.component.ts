import { Component } from '@angular/core';
import { defaultGridOptions } from '@shared/constants/agGrid';
import { BillingService } from '@shared/services/billing.service';
import { AgGridModule } from 'ag-grid-angular';
import { colDefs } from './constants/agGrid';
import { GridOptions } from 'ag-grid-community';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-import-billing',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './import-billing.component.html',
  styleUrl: './import-billing.component.scss'
})
export class ImportBillingComponent {
  colDefs = colDefs;
  rowData: any[] = []
  gridOptions: GridOptions = { ...defaultGridOptions, rowSelection: 'multiple' };
  selected = new BehaviorSubject<any[]>([]);

  constructor(private billingService: BillingService) {}

  ngOnInit(): void {
    this.billingService.getForImport().subscribe((res) => {
      this.rowData = res;
    })
  }
}
