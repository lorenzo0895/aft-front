import { MatDialogConfig } from '@angular/material/dialog';
import { IModalData } from 'src/app/shared/interfaces/IModalData';
import { FormlyFieldConfig } from '@ngx-formly/core';

const fields = (row: any): FormlyFieldConfig[] => [
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        key: 'username',
        type: 'input',
        className: 'flex-1',
        props: {
          label: 'Usuario',
          required: true,
          disabled: row !== undefined,
        },
      },
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
      {
        key: 'isActive',
        type: 'switch',
        props: {
          label: 'Habilitado',
        },
      },
    ],
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        key: 'email',
        type: 'input',
        className: 'flex-1',
        props: {
          label: 'Email',
          required: true,
        },
      },
      {
        key: 'password',
        type: 'input',
        className: 'flex-1',
        hide: row,
        props: {
          type: 'password',
          label: 'Contraseña',
          required: !row,
        },
      },
      {
        key: 'password2',
        type: 'input',
        className: 'flex-1',
        hide: row,
        props: {
          type: 'password',
          label: 'Confirmar contraseña',
          required: !row,
        },
      },
    ],
  },
  {
    type: 'html',
    className: 'html-type',
    props: {
      innerHTML: '<h3>Fechas</h3>',
    },
  },
  {
    fieldGroupClassName: 'display-flex switch-flex',
    fieldGroup: [
      {
        key: 'roles.openDay',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Abrir días',
        },
      },
      {
        key: 'roles.closeDay',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Cerrar días',
        },
      },
      {
        key: 'roles.reopenDay',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Reabrir días',
        },
      },
    ],
  },
  {
    type: 'html',
    className: 'html-type',
    props: {
      innerHTML: '<h3>Clientes</h3>',
    },
  },
  {
    fieldGroupClassName: 'display-flex switch-flex',
    fieldGroup: [
      {
        key: 'roles.createClient',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Crear clientes',
        },
      },
      {
        key: 'roles.editClient',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Editar clientes',
        },
      },
      {
        type: 'html',
        className: 'flex-1',
      },
      // {
      //   key: 'roles.inactivateClient',
      //   type: 'switch',
      //   className: 'flex-1',
      //   props: {
      //     label: 'Deshabilitar clientes',
      //   },
      // },
    ],
  },
  {
    type: 'html',
    className: 'html-type',
    props: {
      innerHTML: '<h3>Comprobantes de Caja</h3>',
    },
  },
  {
    fieldGroupClassName: 'display-flex switch-flex',
    fieldGroup: [
      {
        key: 'roles.openReceipt',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Crear comprobantes',
        },
      },
      {
        key: 'roles.editReceipt',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Editar comprobantes',
        },
      },
      {
        key: 'roles.closeReceipt',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Cerrar comprobantes',
        },
      },
    ],
  },
  {
    fieldGroupClassName: 'display-flex switch-flex',
    fieldGroup: [
      {
        key: 'roles.reopenReceipt',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Reabrir comprobantes',
        },
      },
      {
        key: 'roles.cancelReceipt',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Reverso de comprobantes',
        },
      },
      {
        className: 'flex-1',
        type: 'html',
      },
    ],
  },
  {
    type: 'html',
    className: 'html-type',
    props: {
      innerHTML: '<h3>Usuarios</h3>',
    },
  },
  {
    fieldGroupClassName: 'display-flex switch-flex',
    fieldGroup: [
      {
        key: 'roles.createUser',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Crear usuarios',
        },
      },
      {
        key: 'roles.editUser',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Editar usuarios',
        },
      },
      {
        className: 'flex-1',
        type: 'html',
      },
    ],
  },
  {
    type: 'html',
    className: 'html-type',
    props: {
      innerHTML: '<h3>Netos</h3>',
    },
  },
  {
    fieldGroupClassName: 'display-flex switch-flex',
    fieldGroup: [
      {
        key: 'roles.addConcept',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Añadir neto',
        },
      },
      {
        key: 'roles.editConcept',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Editar neto',
        },
      },
      {
        key: 'roles.deleteConcept',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Eliminar neto',
        },
      },
    ],
  },
  {
    fieldGroupClassName: 'display-flex switch-flex',
    fieldGroup: [
      {
        key: 'roles.closeConcept',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Marcar neto pagado',
        },
      },
      {
        key: 'roles.reopenConcept',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Marcar neto impago',
        },
      },
      {
        className: 'flex-1',
        type: 'html',
      },
    ],
  },
  {
    type: 'html',
    className: 'html-type',
    props: {
      innerHTML: '<h3>Facturación</h3>',
    },
  },
  {
    fieldGroupClassName: 'display-flex switch-flex',
    fieldGroup: [
      {
        key: 'roles.getBilling',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Ver facturación',
        },
      },
      {
        key: 'roles.postBilling',
        type: 'switch',
        className: 'flex-1',
        props: {
          label: 'Editar facturación',
        },
      },
      {
        className: 'flex-1',
        type: 'html',
      },
    ],
  },
];

export const passwordFields: FormlyFieldConfig[] = [
  {
    validators: {
      validation: [
        {
          name: 'match',
          options: {
            field1: 'password',
            field2: 'password2',
            errorPath: 'password2',
          },
        },
      ],
    },
    fieldGroup: [
      {
        key: 'password',
        type: 'input',
        props: {
          type: 'password',
          label: 'Contraseña',
          minLength: 7
        }
      },
      {
        key: 'password2',
        type: 'input',
        props: {
          type: 'password',
          label: 'Confirmar contraseña',
        }
      }
    ]
  }
]

export const userModalData = (row?: any): MatDialogConfig<IModalData> => {
  if (row) {
    const roles = row.roles.split(',').reduce((acc: any, curr: string) => {
      return { ...acc, [curr]: true };
    }, {});
    row = { ...row, roles: roles };
  }
  return {
    width: '800px',
    data: {
      type: row ? 'edit' : 'new',
      title: row ? 'Editar Usuario' : 'Nuevo Usuario',
      formlyData: {
        fields: fields(row),
        model: row ? row : { isActive: true },
      },
      closeAfterSubmit: false,
      onSubmit: (_, model: any) => {
        const roles = Object.entries(model.roles ?? {}).reduce(
          (acc: string[], [key, value]) => {
            return value ? [...acc, key] : acc;
          },
          []
        );
        return { ...model, roles: roles.join(',') };
      },
    },
  };
};

export const passwordModalData: MatDialogConfig<IModalData> = {
  width: '500px',
  data: {
    type: 'new',
    title: 'Cambio de contraseña',
    formlyData: {
      fields: passwordFields,
    },
    closeAfterSubmit: false,
    onSubmit: (_, model: any) => {
      return { password: model.password };
    },
  },
};
