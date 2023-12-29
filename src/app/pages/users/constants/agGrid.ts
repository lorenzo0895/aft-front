import { ColDef, ValueFormatterParams } from 'ag-grid-community';
import { CustomTextComponent } from 'src/app/shared/components/ag-grid/custom-text/custom-text.component';
import { UsersComponent } from '../users.component';
import { ActionCellComponent } from '@shared/components/ag-grid/action-cell/action-cell.component';

export const colDefs = (parentComponent: UsersComponent, isMobile = false): ColDef[] => [
  { field: 'username', headerName: 'Usuario', flex: 1,cellClass: 'text-left' },
  { field: 'name', headerName: 'Nombre', flex: 1,cellClass: 'text-left', hide: isMobile },
  { field: 'surname', headerName: 'Apellido', flex: 1,cellClass: 'text-left', hide: isMobile },
  { field: 'email', headerName: 'Email', flex: 2,cellClass: 'text-left', hide: isMobile },
  {
    field: 'isActive',
    headerName: 'Habilitado',
    flex: 1,
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
    hide: !parentComponent.authService.hasRole('editUser'),
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
        password: {
          icon: 'pi pi-shield',
          onAction: (action: string, rowData: any) => {
            parentComponent.changePassword(rowData);
          },
          className: 'red',
          tooltip: 'Contraseña',
          origin: 'primeng',
        },
      },
    },
    valueGetter: () => ['edit', 'password'],
  },
];

