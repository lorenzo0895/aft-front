import { MatDialogConfig } from '@angular/material/dialog';
import { IModalData } from 'src/app/shared/interfaces/IModalData';
import { ReceiptsComponent } from '../receipts.component';
import { clientDateOnSubmit, clientDateSearch } from '@shared/constants/search';
import { fields } from './fields';

export const newModalData = (
  parent: ReceiptsComponent
): MatDialogConfig<IModalData> => {
  return {
    width: '85%',
    maxWidth: '1000px',
    data: {
      title: 'Nuevo Comprobantes de Caja',
      type: 'new',
      closeAfterSubmit: false,
      formlyData: {
        fields: fields(parent),
      },
      onSubmit: (_, model) => {
        return {
          ...model,
          cheques: model.cheques.filter((x: any) => Object.keys(x ?? {}).length > 0)
        }
      },
    },
  };
};

export const closeModalData: MatDialogConfig<IModalData> = {
  width: '500px',
  data: {
    title: 'Cerrar Comprobantes de caja',
    type: 'confirmation',
    bodyText:
      '¿Está seguro que desea cerrar este comprobante de caja? No podrá borrar o editar más sus netos.',
  },
};

export const openModalData: MatDialogConfig<IModalData> = {
  width: '500px',
  data: {
    title: 'Reabrir Comprobantes de caja',
    type: 'confirmation',
    bodyText: '¿Está seguro que desea reabrir este comprobante de caja?',
  },
};

export const searchModalData = (
  parent: ReceiptsComponent
): MatDialogConfig<IModalData> => {
  return {
    width: '500px',
    data: {
      title: 'Buscar Comprobante de caja',
      type: 'new',
      formlyData: {
        fields: clientDateSearch(parent),
      },
      onSubmit: (_, model) => {
        return clientDateOnSubmit(model);
      },
    },
  };
};
