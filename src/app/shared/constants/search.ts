import { FormlyFieldConfig } from '@ngx-formly/core';
import { AbstractControl } from '@angular/forms';
import { clientToOptions } from '@shared/constants/clientsToOptions';
import { ReceiptsComponent } from '@pages/receipts/receipts.component';
import { ReceiptsItemsComponent } from '@pages/receipts-items/receipts-items.component';
import moment from 'moment';
import { map } from 'rxjs';

export const clientDateSearch = (
  parent: ReceiptsComponent | ReceiptsItemsComponent
): FormlyFieldConfig[] => {
  const all = { value: 0, label: 'Todos' };
  const dates = parent.filterModel?.date;
  return [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'date',
          type: 'calendar',
          defaultValue: dates
            ? [dates[0].toDate(), dates[1].toDate()]
            : [new Date(), new Date()],
          className: 'flex-1',
          props: {
            type: 'range',
            label: 'Rango de fechas',
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
      ],
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'client',
          type: 'dropdown',
          className: 'flex-1',
          defaultValue: all,
          props: {
            placeholder: 'Cliente',
            options: parent.clients.pipe(
              map((res) => [...clientToOptions(res)])
            ),
            attributes: {
              bindLabelOp: 'label',
              searchable: 'true',
            },
          },
        },
      ],
    },
  ];
};

export const clientDateOnSubmit = (model: any) => {
  return {
    client: model.client.value === 0 ? undefined : model?.client || '',
    date: [
      moment(model?.date?.[0]?.toISOString()?.slice(0, 10)),
      moment(model?.date?.[1]?.toISOString()?.slice(0, 10)),
    ],
  };
};
