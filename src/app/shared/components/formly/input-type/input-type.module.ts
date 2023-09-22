import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTypeComponent } from './input-type.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    InputTypeComponent
  ],
  imports: [
    CommonModule,
    InputNumberModule,
    InputTextModule,
    InputMaskModule,
    KeyFilterModule,
    ReactiveFormsModule,
    PasswordModule,
    FormlyModule.forChild(),
  ],
  exports: [InputTypeComponent]
})
export class InputTypeModule { }
