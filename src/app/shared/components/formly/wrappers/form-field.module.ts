import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyWrapperFormField } from './form-field.wrapper';
import { FloatWrapperComponent } from './float-wrapper/float-wrapper.component';

@NgModule({
  declarations: [FormlyWrapperFormField, FloatWrapperComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
  ],
})
export class FormlyWrapperFormFieldModule {}
