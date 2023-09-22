import { AbstractControl } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { IModalData } from 'src/app/shared/interfaces/IModalData';
import { DatesComponent } from '../dates.component';

const fields = (parentComponent: DatesComponent): FormlyFieldConfig[] => [
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        key: 'day',
        type: 'calendar',
        className: 'flex-1',
        props: {
          label: 'Fecha',
        },
        validators: {
          repeated: {
            expression: (c: AbstractControl<Date>) => {
              if (!c.value) return true;
              return !parentComponent.rowData?.find((x) => {
                const rowTime = new Date(x.day).getTime();
                return c.value.getTime() === rowTime;
              });
            },
            message: () => `El día ya existe`,
          },
        },
      },
    ],
  },
];

export const newModalData = (
  parentComponent: DatesComponent
): MatDialogConfig<IModalData> => {
  return {
    width: '400px',
    data: {
      title: 'Nueva Fecha',
      type: 'new',
      formlyData: {
        fields: fields(parentComponent),
      },
      onSubmit: (_: any, model: any) => {
        return {
          day: (<Date>model.day)?.toISOString().substring(0, 10),
        };
      },
      closeAfterSubmit: false,
    },
  };
};

export const closeModalData: MatDialogConfig<IModalData> = {
  width: '400px',
  data: {
    title: 'Cerrar Fecha',
    type: 'confirmation',
    bodyText:
      '¿Está seguro que desea cerrar este día?<br>No podrá cargar más comprobantes de caja con esta fecha.',
  },
};
