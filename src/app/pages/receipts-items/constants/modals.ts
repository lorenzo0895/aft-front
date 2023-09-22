import { MatDialogConfig } from '@angular/material/dialog';
import { IModalData } from 'src/app/shared/interfaces/IModalData';
import { ReceiptsItemsComponent } from '../receipts-items.component';
import { clientDateOnSubmit, clientDateSearch } from '@shared/constants/search';

export const searchModalData = (parent: ReceiptsItemsComponent): MatDialogConfig<IModalData> => {
  return {
    width: '500px',
    data: {
      title: 'Buscar neto',
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

export const openCloseModalData = (
  type: 'open' | 'close'
): MatDialogConfig<IModalData> => {
  return {
    width: '500px',
    data: {
      title: type === 'close' ? 'Confirmar Pago' : 'Marcar como impago',
      type: 'confirmation',
      bodyText:
        type === 'close'
          ? '¿Está seguro que desea marcar como pagado este neto?'
          : '¿Está seguro que desea marcar como impago este neto?',
    },
  };
};
