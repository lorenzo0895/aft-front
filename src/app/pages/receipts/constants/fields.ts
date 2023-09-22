import { banks } from '@shared/constants/banks';
import { cities } from '@shared/constants/cities';
import { ReceiptsComponent } from '../receipts.component';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { clientToOptions } from '@shared/constants/clientsToOptions';
import { map } from 'rxjs';

export const fields = (parent: ReceiptsComponent): FormlyFieldConfig[] => [
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        key: 'day',
        type: 'dropdown',
        className: 'flex-1',
        props: {
          placeholder: 'Día',
          required: true,
          options: parent.days,
          attributes: {
            bindValueOp: 'value',
            bindLabelOp: 'label',
          },
        },
      },
      {
        key: 'client',
        type: 'dropdown',
        className: 'flex-1',
        props: {
          placeholder: 'Cliente',
          required: true,
          options: parent.clients.pipe(map((res) => [...clientToOptions(res)])),
          attributes: {
            bindValueOp: 'value',
            bindLabelOp: 'label',
            searchable: 'true',
          },
        },
      },
      {
        key: 'total',
        type: 'input',
        className: 'flex-1',
        props: {
          label: 'Total',
          disabled: true,
          type: 'currency',
        },
        expressions: {
          total: (field) => {
            const a =
              (field.model.cash ?? 0) +
              (field.model.transferAmount ?? 0) +
              field.model.cheques.reduce(
                (acc: number, curr: any) => acc + (curr?.amount ?? 0),
                0
              );
            field.formControl?.patchValue(a);
          },
        },
      },
    ],
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        key: 'description',
        type: 'input',
        className: 'flex-1',
        props: {
          label: 'Concepto',
          // placeholder: 'Descripción',
        },
      },
    ],
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        key: 'cash',
        type: 'input',
        className: 'flex-1',
        defaultValue: 0,
        props: {
          label: 'Efectivo',
          min: 0,
          required: true,
          type: 'currency',
        },
      },
      {
        key: 'transferAmount',
        defaultValue: 0,
        type: 'input',
        className: 'flex-1',
        props: {
          label: 'Transferido',
          min: 0,
          required: true,
          type: 'currency',
        },
      },
    ],
  },
  {
    key: 'cheques',
    type: 'repeat',
    defaultValue: [],
    props: {
      label: 'Cheques',
    },
    fieldArray: {
      fieldGroup: [
        {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
              key: 'number',
              type: 'input',
              className: 'flex-1',
              props: {
                label: 'Número',
              },
              expressions: {
                'props.required': (field) => hasValueSet(field.model),
              },
              parsers: [(a) => a || undefined],
            },
            {
              key: 'date',
              type: 'calendar',
              className: 'flex-1',
              props: {
                label: 'Día',
              },
              expressions: {
                'props.required': (field) => hasValueSet(field.model),
              },
              parsers: [(a) => a || undefined],
            },
            {
              key: 'amount',
              type: 'input',
              className: 'flex-1',
              props: {
                label: 'Importe',
                type: 'currency'
              },
              expressions: {
                'props.required': (field) => hasValueSet(field.model),
              },
              parsers: [
                (a) => ([null, undefined, ''].includes(a) ? undefined : a),
              ],
            },
            {
              key: 'cuit',
              type: 'input',
              className: 'flex-1',
              props: {
                label: 'CUIT',
                minLength: 11,
                maxLength: 11,
              },
              expressions: {
                'props.required': (field) => hasValueSet(field.model),
              },
              parsers: [(a) => a || undefined],
            },
            {
              key: 'bank',
              type: 'autocomplete',
              className: 'flex-1',
              props: {
                label: 'Banco',
                options: banks.map((it) => it.name),
              },
              expressions: {
                'props.required': (field) => hasValueSet(field.model),
              },
              parsers: [(a) => a || undefined],
            },
            {
              key: 'branchOffice',
              type: 'autocomplete',
              className: 'flex-1',
              props: {
                label: 'Sucursal',
                options: cities.map((it) => it.city),
              },
              expressions: {
                'props.required': (field) => hasValueSet(field.model),
              },
              parsers: [(a) => a || undefined],
            },
          ],
        },
      ],
    },
  },
];

function hasValueSet(model?: any) {
  return Object.keys(model ?? {}).some(
    (key) => ![null, undefined].includes(model[key])
  );
}
