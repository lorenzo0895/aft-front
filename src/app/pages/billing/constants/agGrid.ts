import { cuitFormatter } from "@shared/formatters/cuitFormatter";
import { currencyFormatter } from "@shared/formatters/currencyFormatter";
import { ColDef, GridOptions } from "ag-grid-community";
import { BillingComponent } from "../billing.component";
import { dateFormatter } from "@shared/formatters/dateFormatter";
import { defaultGridOptions } from "@shared/constants/agGrid";

export const gridOptions: GridOptions = {
  ...defaultGridOptions,
  rowSelection: 'multiple',
};

export const colDefs = (parent: BillingComponent): ColDef[] => [
  {
    checkboxSelection: (params) => {
      return !params.data.CodAutorizacion;
    },
    headerCheckboxSelection: true,
    showDisabledCheckboxes: true,
    width: 67,
    maxWidth: 67,
  },
  { 
    field: 'number',
    valueGetter: (params) => {
      if (!params.data.CbteDesde) return `${String(params.data.PtoVta).padStart(4, '0')}-XXXXXXXX`;
      return String(params.data.PtoVta).padStart(4, '0') + '-' + String(params.data.CbteDesde).padStart(8, '0')
    }
  },
  {
    field: 'CbteFch',
    headerName: 'Fecha',
    valueFormatter: (params) => dateFormatter(params.value),
  },
  {
    field: 'FchVtoPago',
    headerName: 'Vto. Pago',
    valueFormatter: (params) => dateFormatter(params.value),
  },
  // {
  //   field: 'FchServDesde',
  //   headerName: 'Desde',
  //   valueFormatter: (params) => dateFormatter(params.value),
  // },
  // {
  //   field: 'FchServHasta',
  //   headerName: 'Hasta',
  //   valueFormatter: (params) => dateFormatter(params.value),
  // },
  { 
    field: 'client',
    headerName: 'Cliente',
    cellClass: 'text-left',
    valueGetter: (params) => {
      const client = parent.clients.find(x => x.cuit === params.data.DocNro);
      return client
        ? (client.surname ? `${client.surname}, ${client.name}` : client.name)
        : '';
    } 
  },
  { field: 'DocNro', headerName: 'CUIT', valueFormatter: (params) => cuitFormatter(params.value) },
  { field: 'CodAutorizacion', headerName: 'CAE' },
  { 
    field: 'Iva.AlicIva.0.BaseImp',
    headerName: 'Neto',
    cellClass: 'text-right',
    valueFormatter: (params) => {
      return currencyFormatter(params.value)
    },
  },
  { 
    field: 'Iva.AlicIva.0.Importe',
    headerName: 'IVA',
    cellClass: 'text-right',
    valueFormatter: (params) => {
      return currencyFormatter(params.value)
    },
  },
  {
    field: 'Total',
    cellClass: 'text-right' ,
    valueGetter: (params) => {
      return Number(params.data.Iva.AlicIva[0].BaseImp) + Number(params.data.Iva.AlicIva[0].Importe)
    },
    valueFormatter: (params) => {
      return currencyFormatter(params.value)
    },
  }
]