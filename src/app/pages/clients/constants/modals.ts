import { MatDialogConfig } from '@angular/material/dialog';
import { IModalData } from 'src/app/shared/interfaces/IModalData';
import { newEditFields } from './formly';

export const clientModalData = (row?: any): MatDialogConfig<IModalData> => {
  return {
    width: '600px',
    data: {
      type: row ? 'edit' : 'new',
      title: row ? 'Editar Cliente' : 'Nuevo Cliente',
      formlyData: {
        fields: newEditFields,
        model: row,
      },
      onSubmit: (_, model) => {
        return { ...model, cuit: model.cuit?.replace?.(/\-/g, '') };
      },
      closeAfterSubmit: false,
    },
  }
};
