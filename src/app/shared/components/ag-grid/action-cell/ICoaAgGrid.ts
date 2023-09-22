import { GridOptions, ColDef } from 'ag-grid-community';
import { ActionCellComponent } from './action-cell.component';

export interface ICoaGridOptions extends GridOptions {
  context?: {
    [key: string]: any;
  };
}

export interface IActionCellEvent {
  icon?: string;
  onAction?: (actionName:string, rowData: any) => void;
  className?: string;
  tooltip?: string;
  origin?: string;
}

export interface IActionCellEvents {
  [action: string]: IActionCellEvent;
}

export interface ICoaColDef extends ColDef {
  cellRenderer?: ActionCellComponent | any;
  cellRendererParams?: {
    actionCellEvents?: IActionCellEvents;
    [key: string]: any;
  };
}
