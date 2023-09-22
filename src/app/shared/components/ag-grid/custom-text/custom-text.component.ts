import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { DataStoreService } from '@shared/services/data-store.service';
import { ICellRendererParams } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { coaIcon, getIconValue, ICoaIconItem } from './constants/icons';

export interface ICellRendererParamsCustom extends ICellRendererParams {
  fieldA: string;
  valueA?: string;
  alignment?: string;
  entity?: string;
}

export interface IAGGridCellValue {
  value: string;
  iconImg: string;
  tooltip: string;
  alignment?: string;
}

@Component({
  selector: 'app-custom-text',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, MatIconModule],
  templateUrl: './custom-text.component.html',
  styleUrls: ['./custom-text.component.scss'],
})
export class CustomTextComponent implements OnInit {
  value!: any;
  withTxt: boolean = false;
  withImg: boolean = false;
  tooltip: string = '';
  iconClass: string = '';
  iconImg: string = '';
  alignment: 'center' | 'left' | 'right' = 'center';
  type?: string;
  referenceValues!: Observable<any>;

  ngOnInit(): void {}

  agInit(params: any): void {
    this.withImg = params?.iconImg ? true : false;
    this.setValues(params);
  }

  refresh(params: any) {
    this.setValues(params);
  }

  setValues(params: any) {
    this.value = params.value;
    this.tooltip = params.tooltip;
    this.setIcon(getIconValue(params.type, params.value));
    this.referenceValues = params.referenceValues;
    switch (params.type) {
      case 'trueFalse':
        break;
      default:
        break;
    }
  }

  setIcon(value: string) {
    const obj: ICoaIconItem = coaIcon[value];
    this.iconImg = obj?.icon ?? coaIcon['default'].icon!;
    this.iconClass = obj?.iconClass ?? coaIcon['default'].iconClass!;
  }
}
