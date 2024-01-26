import { map } from "rxjs";
import { ImportBillingComponent } from "../components/import-billing/import-billing.component";
import { MatDialogConfig } from "@angular/material/dialog";
import { IModalData } from "@shared/interfaces/IModalData";
import { AbstractControl } from "@angular/forms";

export const dateModalData: MatDialogConfig<IModalData> = {
  width: '500px',
  data: {
    title: 'Fecha de facturas',
    type: 'new',
    confirmText: 'Importar',
    closeAfterSubmit: false,
    formlyData: {
      fields: [
        {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
              key: 'date',
              type: 'calendar',
              className: 'flex-1',
              defaultValue: new Date(),
              props: {
                label: 'Fecha de facturación',
                required: true,
              }
            },
            {
              key: 'datePayment',
              type: 'calendar',
              className: 'flex-1',
              defaultValue: new Date(),
              props: {
                label: 'Vto. pago',
                required: true,
              }
            },
          ]
        },
        {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
              key: 'dateFrom',
              type: 'calendar',
              className: 'flex-1',
              defaultValue: new Date(),
              props: {
                label: 'Fecha desde',
                required: true,
              }
            },
            {
              key: 'dateTo',
              type: 'calendar',
              className: 'flex-1',
              defaultValue: new Date(),
              props: {
                label: 'Fecha hasta',
                required: true,
              }
            }
          ]
        }
      ]
    },
    onSubmit: (_, model) => {
      return {
        date: model.date?.toISOString().substring(0, 10),
        dateFrom: model.dateFrom?.toISOString().substring(0, 10),
        dateTo: model.dateTo?.toISOString().substring(0, 10),
        datePayment: model.datePayment?.toISOString().substring(0, 10),
      }
    }
  }
}
export const importModalData: MatDialogConfig<IModalData> = {
  width: '90vw',
  data: {
    title: 'Importar facturas',
    type: 'custom',
    component: ImportBillingComponent,
    confirmText: 'Siguiente',
    disableSubmit: (component: ImportBillingComponent) => {
      return component.selected.pipe(map(x => !x.length));
    },
    onSubmit: (component: ImportBillingComponent) => {
      return component.selected.value;
    },
    closeAfterSubmit: false,
  }
}

export const configsModalData = (generalConfig: any): MatDialogConfig<IModalData> => ({
  width: '500px',
  data: {
    title: 'Configuraciones generales',
    type: 'edit',
    closeAfterSubmit: false,
    formlyData: {
      model: generalConfig,
      fields: [
        {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
              key: 'cuit',
              type: 'input',
              className: 'flex-1',
              props: {
                label: 'CUIT',
                required: true,
                type: 'mask',
                attributes: {
                  mask: '99-99999999-9',
                },
              }
            },
            {
              key: 'salePoint',
              type: 'input',
              className: 'flex-1',
              props: {
                label: 'Punto de venta',
                required: true,
              },
              validators: {
                salePoint: {
                  expression: (c: AbstractControl) => {
                    if(!c.value) return true;
                    return /^[0-9]{1,4}$/.test(c.value);
                  },
                  message: 'Formato no válido'
                }
              }
            },
          ]
        },
      ]
    },
    onSubmit: (_, model) => {
      return {
        ...model,
        cuit: String(model.cuit).replace(/\-/g, ''),
      }
    },
  }
})