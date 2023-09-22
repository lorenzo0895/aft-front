import { MatDialogConfig } from '@angular/material/dialog';
import { IModalData } from 'src/app/shared/interfaces/IModalData';
import { UtilsComponent } from '../utils.component';
import { liqPrimGranosFields, minutaFields, xubioFields } from './fields';
import { of } from 'rxjs';

export const minutaModalData = (
  parent: UtilsComponent
): MatDialogConfig<IModalData> => {
  return {
    width: '600px',
    data: {
      type: 'new',
      title: 'Reporte - Minuta',
      formlyData: {
        fields: minutaFields(parent),
      },
      onSubmit: (_, model) => {
        return {
          start: model.date[0].toISOString().slice(0, 10),
          end: model.date[1].toISOString().slice(0, 10),
          orderBy: model.orderBy,
          client: model.client || ''
        };
      },
    },
  };
};

export const xubioModalData = (
  parent: UtilsComponent
): MatDialogConfig<IModalData> => {
  return {
    width: '500px',
    data: {
      type: 'new',
      title: 'Reporte - Xubio',
      formlyData: {
        fields: xubioFields(parent),
      },
      onSubmit: (_, model) => {
        return {
          start: model.date[0].toISOString().slice(0, 10),
          end: model.date[1].toISOString().slice(0, 10),
          firstNumber: model.firstNumber,
          emitDate: model.emitDate,
        };
      },
    },
  };
};

export const liqPrimGranosModalData = (
  parent: UtilsComponent
): MatDialogConfig<IModalData> => {
  return {
    width: '500px',
    data: {
      type: 'new',
      title: 'Unificar LPG',
      formlyData: {
        fields: liqPrimGranosFields(parent),
      },
      closeAfterSubmit: false,
      disableSubmit: () => of(false),
      // onSubmit: (_, model) => {
      //   return {
      //     start: model.date[0].toISOString().slice(0, 10),
      //     end: model.date[1].toISOString().slice(0, 10),
      //     firstNumber: model.firstNumber,
      //     emitDate: model.emitDate,
      //   };
      // },
    },
  };
};
