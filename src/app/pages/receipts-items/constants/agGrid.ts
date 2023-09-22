import { ActionCellComponent } from '@shared/components/ag-grid/action-cell/action-cell.component';
import { CustomTextComponent } from '@shared/components/ag-grid/custom-text/custom-text.component';
import { currencyFormatter } from '@shared/formatters/currencyFormatter';
import { dateFormatter } from '@shared/formatters/dateFormatter';
import {
  ColDef,
  ValueFormatterParams,
  ValueGetterParams,
} from 'ag-grid-community';
import { ReceiptsItemsComponent } from '../receipts-items.component';

export const colDefs = (parentComponent: ReceiptsItemsComponent): ColDef[] => [
  {
    field: 'receipt',
    flex: 1,
    maxWidth: 114,
    headerName: 'Comprobante Caja',
    valueGetter: (params: ValueGetterParams) => {
      return params.data?.receipt?.number
      ? String(params.data?.receipt?.number).padStart(8, '0')
      : '';
    },
    onCellClicked: (event) => {
      parentComponent.goToReceipt(event);
    },
    cellClass: 'text-center link',
  },
  {
    field: 'day',
    flex: 1,
    maxWidth: 126,
    headerName: 'Día',
    valueGetter: (params: ValueGetterParams) => {
      return dateFormatter(params.data?.receipt?.day?.day);
    },
  },
  {
    field: 'client',
    flex: 1,
    headerName: 'Cliente',
    valueGetter: (params: ValueGetterParams) => {
      const client = params.data?.receipt?.client;
      return client.surname ? client.surname + ', ' + client.name : client.name;
    },
    cellClass: 'text-left',
  },
  {
    field: 'receiptDescription',
    flex: 1,
    headerName: 'Desc. Comprob.',
    valueGetter: (params: ValueGetterParams) => {
      return params.data.receipt.description;
    },
    cellClass: 'text-left',
  },
  {
    field: 'description',
    flex: 1,
    headerName: 'Descrip.',
    cellClass: 'text-left',
  },
  { field: 'concept.value', flex: 1, headerName: 'Concepto', cellClass: 'text-left' },
  {
    field: 'amount',
    flex: 0.6,
    minWidth: 140,
    headerName: 'Monto',
    cellClass: 'text-right',
    valueFormatter: (params: ValueFormatterParams) => {
      return currencyFormatter(params.value);
    },
  },
  {
    headerName: 'Acciones',
    maxWidth: 120,
    filter: false,
    cellRenderer: ActionCellComponent,
    cellRendererParams: {
      actionCellEvents: {
        close: {
          icon: 'pi pi-check-square',
          onAction: (action: string, rowData: any) => {
            parentComponent.onClose(rowData);
          },
          className: 'green',
          tooltip: 'Marcar pagado',
          origin: 'primeng'
        },
        reopen: {
          icon: 'pi pi-undo',
          onAction: (action: string, rowData: any) => {
            parentComponent.onReopen(rowData);
          },
          className: 'red',
          tooltip: 'Marcar impago',
          origin: 'primeng'
        },
      },
    },
    valueGetter: (params: ValueGetterParams) => {
      const array: string[] = [];
      if (
        parentComponent.authService.hasRole('closeConcept') &&
        params.data.isActive
      ) {
        array.push('close');
      }
      if (
        parentComponent.authService.hasRole('reopenConcept') &&
        !params.data.isActive
      ) {
        array.push('reopen');
      }
      return array;
    },
  },
];
