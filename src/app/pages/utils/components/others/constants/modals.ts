import { MatDialogConfig } from "@angular/material/dialog";
import { IModalData } from "@shared/interfaces/IModalData";

export const balducchiModalData: MatDialogConfig<IModalData> = {
  width: '600px',
  data: {
    title: 'Transformar Ventas Balducchi',
    type: 'new',
    formlyData: {
      fields: [
        {
          key: 'files',
          type: 'file',
          className: 'flex-1',
          props: {
            required: true,
            acceptedTypes: ['.xlsx', '.xls', '.csv'],
            multiple: true,
          },
        },
      ]
    },
  }
}

export const ventasModalData: MatDialogConfig<IModalData> = {
  width: '800px',
  data: {
    title: 'Ventas generales - Generar .xls y .prn',
    type: 'new',
    formlyData: {
      fields: [
        {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
              key: 'files',
              type: 'file',
              className: 'flex-1 align-self-stretch',
              props: {
                required: true,
                acceptedTypes: ['.xlsx', '.xls', '.csv'],
                multiple: true,
              },
            },
            {
              className: 'flex-1',
              fieldGroup: [
                {
                  key: 'neto',
                  type: 'input',
                  className: 'flex-1',
                  defaultValue: 'VME',
                  props: {
                    label: 'Código Neto',
                    required: true,
                  }
                },
                {
                  key: 'noGravado',
                  type: 'input',
                  className: 'flex-1',
                  defaultValue: 'NGV',
                  props: {
                    label: 'Código No Gravado/Exento',
                    required: true,
                  }
                },
                {
                  key: 'netoYNoGravado',
                  type: 'input',
                  className: 'flex-1',
                  defaultValue: 'VCO',
                  props: {
                    label: 'Código Neto (si tiene No Gravado/Exento)',
                    required: true,
                  }
                }
              ]
            },
          ]
        },
      ]
    },
  }
}