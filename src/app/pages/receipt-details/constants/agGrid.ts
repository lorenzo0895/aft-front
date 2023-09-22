import { ActionCellComponent } from '@shared/components/ag-grid/action-cell/action-cell.component';
import { cuitFormatter } from '@shared/formatters/cuitFormatter';
import { currencyFormatter } from '@shared/formatters/currencyFormatter';
import { dateFormatter } from '@shared/formatters/dateFormatter';
import {
  ColDef,
  ValueFormatterParams,
  ValueGetterParams,
} from 'ag-grid-community';
import { ReceiptDetailsComponent } from '../receipt-details.component';



export const conceptsColDefs = (
  parentComponent: ReceiptDetailsComponent
): ColDef[] => [
  {
    field: 'concept',
    headerName: 'Concepto',
    flex: 1,
    valueGetter: (params: ValueGetterParams) => {
      return params.data.concept.description;
    },
  },
  {
    field: 'description',
    headerName: 'Descripción',
    flex: 1,
  },
  {
    field: 'amount',
    headerName: 'Monto',
    flex: 1,
    filter: 'agNumberColumnFilter',
    valueFormatter: (params: ValueFormatterParams) => {
      return currencyFormatter(params.value);
    },
  },
  {
    headerName: 'Acciones',
    width: 170,
    maxWidth: 170,
    filter: false,
    sortable: false,
    hide: !parentComponent.receipt.isActive,
    cellRenderer: ActionCellComponent,
    cellRendererParams: {
      actionCellEvents: {
        edit: {
          icon: 'pi pi-pencil',
          onAction: (action: string, rowData: any) => {
            parentComponent.onEditConcept(rowData);
          },
          className: 'blue',
          tooltip: 'Editar',
          origin: 'primeng',
        },
        delete: {
          icon: 'pi pi-trash',
          onAction: (action: string, rowData: any) => {
            parentComponent.onDeleteConcept(rowData);
          },
          className: 'red',
          tooltip: 'Eliminar',
          origin: 'primeng',
        },
      },
    },
    valueGetter: (params: ValueGetterParams) => {
      const array: string[] = [];
      if (parentComponent.authService.hasRole('editConcept')) {
        array.push('edit');
      }
      if (parentComponent.authService.hasRole('deleteConcept')) {
        array.push('delete');
      }
      return array;
    }
  },
];
