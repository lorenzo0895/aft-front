import { ColDef, ValueFormatterParams } from 'ag-grid-community';
import { ClientsComponent } from '../clients.component';
import { CustomTextComponent } from '@shared/components/ag-grid/custom-text/custom-text.component';
import { ActionCellComponent } from '@shared/components/ag-grid/action-cell/action-cell.component';

export const colDefs = (parentComponent: ClientsComponent, isMobile: boolean = false): ColDef[] => [
  { field: 'surname', headerName: 'Apellido', flex: 1, cellClass: 'text-left' },
  { field: 'name', headerName: 'Nombre', flex: 1, cellClass: 'text-left' },
  {
    field: 'cuit',
    headerName: 'CUIT',
    flex: 1,
    hide: isMobile,
    valueFormatter: (params: ValueFormatterParams) => {
      const value = String(params.value);
      const cuit = [value.slice(0, 2), value.slice(2, 10), value.slice(10, 11)];
      return cuit[0] + ' - ' + cuit[1] + ' - ' + cuit[2];
    },
    filter: 'agTextColumnFilter',
    filterParams: {
      textMatcher: function (row: any) {
        return row.value.includes(
          (row.filterText as string).replace(/[\s-]/g, '')
        );
      },
    },
  },
  { field: 'location', headerName: 'Ubicación', flex: 1, hide: isMobile },
  { field: 'fiscalCondition', headerName: 'Condicion Fiscal', flex: 1, hide: isMobile },
  { field: 'phone', headerName: 'Celular', flex: 1, hide: isMobile },
  {
    field: 'isActive',
    headerName: 'Habilitado',
    flex: 1,
    maxWidth: 110,
    filter: false,
    sortable: false,
    cellRenderer: CustomTextComponent,
    cellRendererParams: {
      type: 'trueFalse',
    },
    hide: isMobile,
  },
  {
    headerName: 'Acciones',
    width: 110,
    maxWidth: 110,
    filter: false,
    sortable: false,
    cellRenderer: ActionCellComponent,
    cellRendererParams: {
      actionCellEvents: {
        edit: {
          icon: 'pi pi-pencil',
          onAction: (action: string, rowData: any) => {
            parentComponent.openEdit(rowData);
          },
          className: 'blue',
          tooltip: 'Editar',
          origin: 'primeng',
        },
        whatsapp: {
          icon: 'pi pi-whatsapp',
          onAction: (action: string, rowData: any) => {
            parentComponent.whatsapp(rowData);
          },
          className: 'green',
          tooltip: 'Whatsapp',
          origin: 'primeng',
        },
      },
    },
    valueGetter: (params) => {
      const array = [];
      if (params.data.phone) {
        array.push('whatsapp');
      }
      if (parentComponent.authService.hasRoleSignal('editClient')()) {
        array.push('edit');
      }
      return array;
    },
  },
];
