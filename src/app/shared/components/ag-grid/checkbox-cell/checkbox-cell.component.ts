import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-checkbox-cell',
  templateUrl: './checkbox-cell.component.html',
  styleUrls: ['./checkbox-cell.component.scss'],
  standalone: true,
  imports: [CommonModule, CheckboxModule, ReactiveFormsModule],
})
export class CheckboxCellComponent implements ICellRendererAngularComp {
  control!: FormControl<boolean | null>;
  valueChange!: (row: any, value: boolean | null) => any;

  agInit(params: ICellRendererParams<any, any>): void {
    this.control = new FormControl<boolean>(params.value);
    this.valueChange = (params as any)?.valueChanges;
    this.control.valueChanges.subscribe((res) => {
      this.valueChange?.(params.data, res);
      this.refresh(params);
    });
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    this.control.setValue(!this.control.value, { emitEvent: false });
    return false;
  }
}
