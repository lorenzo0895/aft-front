import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChipComponent } from '@shared/components/chip/chip.component';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-chip-cell',
  templateUrl: './chip-cell.component.html',
  styleUrls: ['./chip-cell.component.scss'],
  standalone: true,
  imports: [CommonModule, ChipComponent],
})
export class ChipCellComponent implements ICellRendererAngularComp {
  params!: any;

  agInit(params: ICellRendererParams<any, any>): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }

}
