import { cuitFormatter } from "@shared/formatters/cuitFormatter";
import { currencyFormatter } from "@shared/formatters/currencyFormatter";
import { dateFormatter } from "@shared/formatters/dateFormatter";
import { ColDef, ValueFormatterParams, ValueGetterParams } from "ag-grid-community";

export const colDefs: ColDef[] = [
  {
    field: 'number',
    headerName: 'Número',
    flex: 1,
  },
  {
    field: 'cuit',
    headerName: 'CUIT',
    flex: 1,
    valueFormatter: (params: ValueFormatterParams) => {
      return cuitFormatter(params.value);
    },
  },
  {
    field: 'bank',
    headerName: 'Banco',
    flex: 1,
  },
  {
    field: 'branchOffice',
    headerName: 'Sucursal',
    flex: 1,
  },
  {
    field: 'date',
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
      return dateFormatter(params.data.date);
    },
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
];
