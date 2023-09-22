import { FormlyFieldConfig } from '@ngx-formly/core';
import { LoginComponent } from '../login.component';
import { ENTER } from '@angular/cdk/keycodes';

export const fields = (
  parentComponent: LoginComponent
): FormlyFieldConfig[] => [
  {
    fieldGroup: [
      {
        key: 'username',
        type: 'input',
        className: 'flex-1',
        props: {
          label: 'Usuario',
        }
      },
    ],
  },
  {
    fieldGroup: [
      {
        key: 'password',
        type: 'input',
        className: 'flex-1',
        props: {
          label: 'Contraseña',
          type: 'password',
          keypress: (field, event) => {
            if(event.keyCode === ENTER) {
              parentComponent.login(field.model)
            }
          }
        }
      },
    ],
  },
  {
    fieldGroup: [
      {
        type: 'button',
        className: 'justify-center',
        props: {
          label: 'Ingresar',
          click: (field: any) => {
            parentComponent.login(field.model);
          },
        },
      },
    ],
  },
];
