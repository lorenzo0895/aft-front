import { FormlyFieldConfig } from '@ngx-formly/core';
import { AbstractControl } from '@angular/forms';
import { UtilsComponent } from '../utils.component';

export const minutaFields = (
  parent: UtilsComponent
): FormlyFieldConfig[] => [
  {
    fieldGroup: [
      {
        key: 'date',
        type: 'calendar',
        defaultValue: [new Date(), new Date()],
        props: {
          type: 'range',
          label: 'Rango de fechas',
          required: true,
        },
        validators: {
          validDate: {
            expression: (c: AbstractControl) => {
              if (!c.value) return;
              return c.value?.[0] && c.value?.[1];
            },
            message: () => `Debe seleccionar 2 fechas (desde y hasta)`,
          },
        },
      },
      {
        key: 'client',
        type: 'dropdown',
        defaultValue: 0,
        props: {
          placeholder: 'Cliente',
          attributes: {
            bindValueOp: 'value',
            bindLabelOp: 'label',
            searchable: 'true',
          },
        },
        expressions: {
          'props.options': () => [
            { value: 0, label: 'Todos' },
            ...parent.clients.map((it) => ({
              value: it.id,
              label: it.surname ? it.surname + ', ' + it.name : it.name,
            })),
          ],
        },
      },
      {
        key: 'orderBy',
        type: 'radio',
        className: 'radio-inputs-special',
        defaultValue: 'receipt',
        props: {
          options: [
            { label: 'Ordenar por Comprobante', value: 'receipt' },
            { label: 'Ordenar por Cliente', value: 'client' },
          ],
        },
      },
    ],
  },
];

export const exportSalesFields = (parent: UtilsComponent): FormlyFieldConfig[] => [
  {
    fieldGroup: [
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            key: 'date',
            type: 'calendar',
            className: 'flex-1',
            defaultValue: [new Date(), new Date()],
            props: {
              type: 'range',
              label: 'Rango de fechas',
              required: true,
            },
            validators: {
              validDate: {
                expression: (c: AbstractControl) => {
                  if (!c.value) return;
                  return c.value?.[0] && c.value?.[1];
                },
                message: () => `Debe seleccionar 2 fechas (desde y hasta)`,
              },
            },
          },
          {
            key: 'emitDate',
            type: 'calendar',
            className: 'flex-1',
            defaultValue: new Date(),
            props: {
              label: 'Fecha de emisión',
              required: true,
            },
          },
        ],
      },
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            key: 'salePoint',
            type: 'input',
            defaultValue: 'A-0006',
            className: 'flex-1',
            props: {
              label: 'Punto de venta',
            },
            validators: {
              validFormat: {
                expression: (c: AbstractControl) => {
                  return /^[ABCE]-([0-9]{4}|[0-9]{6})$/.test(c.value);
                },
                message: () => `Debe tener formato X-0000 o X-000000`,
              },
            }
          },
          {
            key: 'firstNumber',
            type: 'input',
            defaultValue: '00000001',
            className: 'flex-1',
            props: {
              label: 'Primer Nº comprobante',
              type: 'mask',
              attributes: {
                mask: '99999999'
              }
            },
          },
        ],
      },
    ],
  },
];

export const liqPrimGranosFields = (parent: UtilsComponent): FormlyFieldConfig[] => [
  {
    fieldGroup: [
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            key: 'files',
            type: 'file',
            className: 'flex-1',
            props: {
              type: 'range',
              label: 'Rango de fechas',
              required: true,
            },
          },
        ],
      },
    ],
  },
];
