import { ColDef, ValueFormatterParams } from 'ag-grid-community';
import { ActionCellComponent } from 'src/app/shared/components/ag-grid/action-cell/action-cell.component';
import { ValueGetterParams } from 'ag-grid-community';
import { ReceiptsComponent } from '../receipts.component';
import { dateFormatter } from 'src/app/shared/formatters/dateFormatter';
import { currencyFormatter } from 'src/app/shared/formatters/currencyFormatter';
import { ChipCellComponent } from '@shared/components/ag-grid/chip-cell/chip-cell.component';

export const colDefs = (parentComponent: ReceiptsComponent): ColDef[] => [
  {
    field: 'number',
    headerName: 'Número',
    flex: 1,
    filter: 'agNumberColumnFilter',
    valueFormatter: (params: ValueFormatterParams) => {
      return String(params.value).padStart(8, '0');
    },
  },
  {
    field: 'day',
    headerName: 'Día',
    flex: 1,
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
      return dateFormatter(params.data.day.day);
    },
  },
  {
    field: 'client',
    headerName: 'Cliente',
    cellClass: 'text-left',
    valueGetter: (params: ValueGetterParams) => {
      const client = params.data.client;
      return client.surname ? client.surname + ', ' + client.name : client.name;
    },
  },
  {
    field: 'total',
    headerName: 'Total',
    flex: 1,
    cellClass: 'text-right',
    filter: 'agNumberColumnFilter',
    valueGetter: (params: ValueGetterParams) => {
      let total = params.data.transferAmount + params.data.cash;
      [...params.data.cheques, ...params.data.cancelCheques].forEach(
        (cheque: any) => (total += cheque.amount)
      );
      return params.data.cancelReceipt ? -total : total;
    },
    valueFormatter: (params: ValueFormatterParams) => {
      return currencyFormatter(params.value);
    },
  },
  {
    headerName: 'Estado',
    valueGetter: (params) => params.data.isCancelled
    ? 'Cancel.'
    : params.data.isActive
    ? 'Abierto'
    : 'Cerrado',
    cellRendererSelector: (params) => {
      const option = params.data.isCancelled
        ? 'cancelled'
        : params.data.isActive
        ? 'open'
        : 'closed';
      const a = {
        cancelled: { color: '#FF6259', icon: 'pi-times' },
        open: { color: '#4CD07D', icon: 'pi-lock-open' },
        closed: { color: '#FBA86F', icon: 'pi-lock' },
      }
      return {
        component: ChipCellComponent,
        params: a[option]
      }
    }
  },
  // {
  //   field: 'isCancelled',
  //   headerName: 'Cancelado',
  //   flex: 0.9,
  //   cellRenderer: CustomTextComponent,
  //   cellRendererParams: {
  //     type: 'trueFalse',
  //   },
  // },
  // {
  //   field: 'isActive',
  //   headerName: 'Activo',
  //   flex: 0.7,
  //   cellRenderer: CustomTextComponent,
  //   cellRendererParams: {
  //     type: 'trueFalse',
  //   },
  // },
  {
    headerName: 'Acciones',
    minWidth: 164,
    maxWidth: 164,
    filter: false,
    sortable: false,
    cellRenderer: ActionCellComponent,
    cellRendererParams: {
      actionCellEvents: {
        print: {
          icon: 'pi pi-print',
          onAction: (action: string, rowData: any) => {
            parentComponent.onPrint(rowData);
          },
          className: 'blue',
          tooltip: 'Imprimir',
          origin: 'primeng',
        },
        edit: {
          icon: 'pi pi-pencil',
          onAction: (action: string, rowData: any) => {
            parentComponent.onDetails(rowData);
          },
          className: 'blue',
          tooltip: 'Editar',
          origin: 'primeng',
        },
        close: {
          icon: 'pi pi-check-square',
          onAction: (action: string, rowData: any) => {
            parentComponent.onClose(rowData);
          },
          className: 'green',
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
        view: {
          icon: 'pi pi-eye',
          onAction: (action: string, rowData: any) => {
            parentComponent.onDetails(rowData);
          },
          className: 'blue',
          tooltip: 'Ver',
          origin: 'primeng',
        },
      },
    },
    valueGetter: (params: ValueGetterParams) => {
      const array: string[] = [];
      if (params.data.isActive) {
        if (parentComponent.authService.hasRoleSignal('editReceipt')()) {
          array.push('edit');
        } else {
          array.push('view');
        }
        if (parentComponent.authService.hasRoleSignal('closeReceipt')())
          array.push('close');
      } else {
        array.push('view')
        if (
          parentComponent.authService.hasRoleSignal('reopenReceipt')() &&
          !params.data.isCancelled
        )
          array.push('open');
      }
      return [...array, 'print'];
    },
  },
];
