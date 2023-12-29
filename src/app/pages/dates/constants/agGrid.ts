import {
  CellClassParams,
  ColDef,
  ValueFormatterParams,
} from 'ag-grid-community';
import { ActionCellComponent } from 'src/app/shared/components/ag-grid/action-cell/action-cell.component';
import { ValueGetterParams } from 'ag-grid-community';
import { currencyFormatter } from 'src/app/shared/formatters/currencyFormatter';
import { dateFormatter } from 'src/app/shared/formatters/dateFormatter';
import { DatesComponent } from '../dates.component';

export const colDefs = (parentComponent: DatesComponent, isMobile = false): ColDef[] => [
  {
    field: 'day',
    headerName: 'Día',
    flex: 1,
    cellClass: 'text-center',
    filter: 'agDateColumnFilter',
    filterParams: {
      comparator: function (
        filterLocalDateAtMidnight: Date,
        cellValue: string
      ) {
        const dateAsString = cellValue;
        const dateParts = dateAsString.split('/');
        const cellDate = new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0])
        );
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
          return 0;
        }
        if (cellDate < filterLocalDateAtMidnight) {
          return -1;
        }
        return 1;
      },
    },
    valueGetter: (params: ValueGetterParams) => {
      return dateFormatter(params.data.day);
    },
  },
  {
    field: 'receiptsQuantity',
    headerName: 'Comprobantes de Caja',
    flex: 1,
    cellClass: 'text-center',
    filter: 'agNumberColumnFilter',
    hide: isMobile,
  },
  {
    field: 'totalReceived',
    headerName: 'Recibido',
    flex: 1,
    filter: 'agNumberColumnFilter',
    cellClass: 'text-right',
    valueFormatter: (params: ValueFormatterParams) => {
      return currencyFormatter(params.value);
    },
    hide: isMobile,
  },
  // {
  //   field: 'totalAudited',
  //   headerName: 'Auditado',
  //   flex: 1,
  //   filter: 'agNumberColumnFilter',
  //   cellClass: 'text-right',
  //   valueFormatter: (params: ValueFormatterParams) => {
  //     return params.data.isActive ? '-' : currencyFormatter(params.value);
  //   },
  // },
  // {
  //   field: 'leftover',
  //   headerName: 'Sobrante',
  //   flex: 1,
  //   filter: 'agNumberColumnFilter',
  //   cellClass: (params: CellClassParams) => {
  //     if (params.data.isActive) return 'text-right';
  //     if (params.data.totalAudited - Number(params.data.totalReceived) >= 0)
  //       return 'text-right green';
  //     return 'text-right red';
  //   },
  //   valueGetter: (params: ValueGetterParams) => {
  //     return params.data.totalAudited - params.data.totalReceived;
  //   },
  //   valueFormatter: (params: ValueFormatterParams) => {
  //     return params.data.isActive ? '-' : currencyFormatter(params.value);
  //   },
  // },
  {
    headerName: 'Acciones',
    width: 150,
    maxWidth: 150,
    filter: false,
    sortable: false,
    cellRenderer: ActionCellComponent,
    cellRendererParams: {
      actionCellEvents: {
        close: {
          icon: 'pi pi-check-square',
          onAction: (action: string, rowData: any) => {
            parentComponent.onClose(rowData);
          },
          className: 'red',
          tooltip: 'Cerrar',
          origin: 'primeng',
        },
        open: {
          icon: 'pi pi-undo',
          onAction: (action: string, rowData: any) => {
            parentComponent.onOpen(rowData);
          },
          className: 'green',
          tooltip: 'Reabrir',
          origin: 'primeng',
        },
        receipts: {
          icon: 'pi pi-file',
          onAction: (action: string, rowData: any) =>
            parentComponent.onView('receipts', rowData.day),
          className: 'orange',
          tooltip: 'Comprobantes de Caja',
          origin: 'primeng',
        },
        concepts: {
          icon: 'pi pi-paperclip',
          onAction: (action: string, rowData: any) =>
          parentComponent.onView('items', rowData.day),
          className: 'blue',
          tooltip: 'Netos',
          origin: 'primeng',
        },
      },
    },
    valueGetter: (params: ValueGetterParams) => {
      const array: string[] = [];
      if (
        parentComponent.authService.hasRole('reopenDay') &&
        !params.data.isActive
      ) {
        array.push('open');
      }
      if (
        parentComponent.authService.hasRole('closeDay') &&
        params.data.isActive
      ) {
        array.push('close');
      }
      return [...array, 'receipts', 'concepts'];
    },
  },
];
