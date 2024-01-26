import { Component, Input } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { defaultGridOptions } from '@shared/constants/agGrid';
import { colDefs } from './constants/agGrid';

@Component({
  selector: 'app-cheques-list',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './cheques-list.component.html',
  styleUrls: ['./cheques-list.component.scss']
})
export class ChequesListComponent {
  colDefs: ColDef[] = colDefs;
  @Input() cheques: any[] = [];
  gridOptions: GridOptions = { ...defaultGridOptions };
}
