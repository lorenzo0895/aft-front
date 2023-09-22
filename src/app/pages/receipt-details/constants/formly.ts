import { FormlyFieldConfig } from '@ngx-formly/core';
import { ReceiptDetailsComponent } from '../receipt-details.component';
import { FormGroup } from '@angular/forms';

export const fields = (
  parent: ReceiptDetailsComponent
): FormlyFieldConfig[] => [
  {
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
              disabled: true,
            },
          },
          {
            key: 'day',
            type: 'input',
            className: 'flex-1',
            props: {
              label: 'Día',
              disabled: true,
            },
          },
          {
            key: 'client',
            type: 'input',
            className: 'flex-1',
            props: {
              label: 'Cliente',
              disabled: true,
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
            props: {
              label: 'Efectivo',
              disabled: true,
              type: 'currency',
            },
          },
          {
            key: 'transferAmount',
            type: 'input',
            className: 'flex-1',
            props: {
              label: 'Transferido',
              disabled: true,
              type: 'currency',
            },
          },
          {
            key: 'cheques',
            type: 'input',
            className: 'flex-1',
            props: {
              label: 'Cheques',
              disabled: true,
              type: 'currency',
            },
          },
          {
            type: 'icon',
            props: {
              icon: 'pi pi-info-circle',
              tooltip: 'Lista de cheques',
              click: () => {
                parent.onShowChequesList();
              }
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
          },
          {
            key: 'totalConcepts',
            type: 'input',
            className: 'flex-1',
            props: {
              label: 'Total netos',
              disabled: true,
              type: 'currency',
            },
          },
          {
            key: 'toBeDefined',
            type: 'input',
            className: 'flex-1',
            props: {
              label: 'A computar',
              disabled: true,
              type: 'currency',
            },
          },
        ],
      },
    ],
  },
];

export const descriptionField = (
  parentComponent: ReceiptDetailsComponent
): FormlyFieldConfig[] => [
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        key: 'description',
        type: 'input',
        className: 'flex-1',
        props: {
          label: 'Concepto',
        },
        expressions: {
          'props.disabled': () => !parentComponent.receipt?.isActive,
        },
      },
      {
        type: 'button',
        props: {
          label: 'Guardar',
          click: () => parentComponent.onEditDescription(),
        },
        expressions: {
          'props.disabled': () => !parentComponent.receipt?.isActive,
        },
      },
    ],
  },
];

export const conceptItemfields = (concepts: any[], model: any): FormlyFieldConfig[] => [
  {
    fieldGroup: [
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            key: 'toBeDefined',
            type: 'input',
            className: 'flex-1',
            props: {
              label: 'Pendiente de computar',
              disabled: true,
              type: 'currency',
            },
          },
          {
            key: 'concept',
            type: 'dropdown',
            className: 'flex-1',
            props: {
              placeholder: 'Concepto',
              options: concepts,
              required: true,
              attributes: {
                bindLabelOp: 'description',
                bindValueOp: 'id',
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
              label: 'Descripción (opcional)',
            },
          },
        ],
      },
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            key: 'amount',
            type: 'input',
            defaultValue: 0,
            className: 'flex-1',
            props: {
              type: 'currency',
              label: 'Importe',
              required: true,
              min: 0,
            },
            expressions: {
              'props.min': (field) => field.model.concept === 13 ? undefined : 0,
            }
          },
          {
            key: 'hasVat',
            type: 'checkbox',
            defaultValue: false,
            props: {
              label: 'Calcular IVA',
              required: true,
              min: 0,
            },
            expressions: {
              hide: (field) => {
                if (model?.concept) return true;
                const concept = concepts.find(it => it.id === field.model.concept);
                if (!concept) return true;
                return !concept.isOwnFee;
              }
            }
          },
          {
            key: 'aliquot',
            type: 'input',
            defaultValue: 21,
            className: 'flex-1',
            props: {
              type: 'percentage',
              label: 'Alícuota',
              min: 0,
            },
            expressions: {
              hide: (field) => !field.model?.hasVat,
              'props.required': (field) => field.model?.hasVat,
            },
          },
          {
            key: 'vat',
            type: 'input',
            className: 'flex-1',
            resetOnHide: true,
            props: {
              disabled: true,
              type: 'currency',
              label: 'IVA',
            },
            expressions: {
              hide: (field) => {
                const hide = !field.model?.hasVat;
                if (hide) return true;
                else {
                  (<FormGroup>field.form)?.patchValue({
                    vat:
                      (field.model?.amount ?? 0) *
                      ((field.model?.aliquot ?? 0) / 100),
                  });
                  return false;
                }
              },
            },
          },
        ],
      },
    ],
  },
];
