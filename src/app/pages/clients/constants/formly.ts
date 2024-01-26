import { AbstractControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const fields: FormlyFieldConfig[] = [
  {
    type: 'checkbox',
    key: 'onlyActive',
    defaultValue: true,
    props: {
      label: 'Solo activos',
    },
  },
];

export const newEditFields: FormlyFieldConfig[] = [
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        key: 'name',
        type: 'input',
        className: 'flex-1',
        props: {
          label: 'Nombre',
          required: true,
        },
      },
      {
        key: 'surname',
        type: 'input',
        className: 'flex-1',
        props: {
          label: 'Apellido',
        },
      },
    ],
  },
  {
    fieldGroupClassName: 'display-flex margin-bottom',
    fieldGroup: [
      {
        key: 'cuit',
        type: 'input',
        className: 'flex-1',
        props: {
          type: 'mask',
          label: 'CUIT',
          required: true,
          attributes: {
            mask: '99-99999999-9',
          },
        },
      },
      {
        key: 'fiscalCondition',
        type: 'dropdown',
        className: 'flex-1',
        props: {
          placeholder: 'Condición Fiscal',
          options: [
            { value: 'CF', label: 'Consumidor Final' },
            { value: 'EX', label: 'Exento' },
            { value: 'MT', label: 'Monotributista' },
            { value: 'RI', label: 'Responsable Inscripto' },
          ],
          attributes: {
            bindValueOp: 'value',
            bindLabelOp: 'label'
          }
        },
      },
    ],
  },
  {
    fieldGroupClassName: 'display-flex margin-bottom',
    fieldGroup: [
      {
        key: 'location',
        type: 'input',
        className: 'flex-1',
        props: {
          label: 'Ubicación',
        },
      },
      {
        key: 'phone',
        type: 'input',
        className: 'flex-1',
        props: {
          label: 'Celular',
          placeholder: '+5493462111111'
        },
        validators: {
          phone: {
            expression: (c: AbstractControl) => {
              if(!c.value) return true;
              return /\+549[0-9]{10,10}/.test(c.value);
            },
            message: 'Formato no válido'
          }
        }
      },
      {
        key: 'isActive',
        type: 'checkbox',
        props: {
          label: 'Habilitado'
        },
      },
    ],
  },
];
