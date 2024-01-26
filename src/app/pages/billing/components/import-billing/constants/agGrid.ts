import { currencyFormatter } from '@shared/formatters/currencyFormatter';
import { ColDef } from 'ag-grid-community';
import { dateFormatter } from 'src/app/shared/formatters/dateFormatter';

export const colDefs: ColDef[] = [
  {
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 70,
    maxWidth: 70,
    filter: false,
    sortable: false,
  },
  { field: 'number' },
  { 
    field: 'day',
    headerName: 'Fecha',
    valueGetter: (params) => dateFormatter(params.data.day)
  },
  {
    field: 'Cliente',
    flex: 2,
    valueGetter: (params) => {
      return params.data.clientSurname
        ? `${params.data.clientSurname}, ${params.data.clientName}`
        : params.data.clientName;
    },
  },
  {
    headerName: 'Neto',
    valueGetter: (params) => {
      return Math.round((params.data.amount) / 0.21 * 100) / 100;
    },
    valueFormatter: (params) => currencyFormatter(params.value),
  },
  {
    field: 'amount',
    headerName: 'Iva',
    valueFormatter: (params) => currencyFormatter(params.value),
  },
  {
    headerName: 'Total',
    valueGetter: (params) => {
      return params.data.amount + Math.round((params.data.amount) / 0.21 * 100) / 100;
    },
    valueFormatter: (params) => currencyFormatter(params.value),
  },
];
