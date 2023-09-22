import { MatDialogConfig } from '@angular/material/dialog';
import { IModalData } from '@shared/interfaces/IModalData';
import { conceptItemfields } from './formly';
import { ChequesListComponent } from '../component/cheques-list/cheques-list.component';

export const conceptModal = (
  concepts: any[],
  model: any
): MatDialogConfig<IModalData> => {
  return {
    width: '600px',
    data: {
      title: model?.concept ? 'Editar neto' : 'Nuevo Neto',
      type: model?.concept ? 'edit' : 'new',
      formlyData: {
        fields: conceptItemfields(concepts, model),
        model: model,
      },
      closeAfterSubmit: false,
      onSubmit: (_, model) => {
        const { toBeDefined, vat, ...rest } = model;
        return rest;
      },
    },
  };
};

export const chequesListModal = (
  receipt: any,
): MatDialogConfig<IModalData> => {
  return {
    width: '90%',
    maxWidth: '1000px',
    data: {
      title: 'Listado de cheques',
      type: 'confirmation',
      component: ChequesListComponent,
      componentParams: {
        cheques: receipt.cheques,
      },
      showCancelButton: false,
      confirmText: 'Cerrar',
    },
  };
};

export const deleteModal: MatDialogConfig<IModalData> = {
  width: '500px',
  data: {
    title: 'Eliminar neto',
    type: 'confirmation',
    bodyText: '¿Está seguro que desea eliminar este neto?',
    closeAfterSubmit: false,
  },
};

export const cancelModal: MatDialogConfig<IModalData> = {
  width: '500px',
  data: {
    title: 'Cancelar Comprobante de Caja',
    type: 'confirmation',
    bodyText: '¿Está seguro que desea cancelar este comprobante de caja?',
  },
};

export const closeModal: MatDialogConfig<IModalData> = {
  width: '500px',
  data: {
    title: 'Cerrar Comprobante de Caja',
    type: 'confirmation',
    bodyText: '¿Está seguro que desea cerrar este comprobante de caja?',
  },
};

export const openModal: MatDialogConfig<IModalData> = {
  width: '500px',
  data: {
    title: 'Reabrir Comprobante de Caja',
    type: 'confirmation',
    bodyText: '¿Está seguro que desea reabrir este comprobante de caja?',
  },
};
