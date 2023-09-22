import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormlySelectModule as FormlyCoreSelectModule } from '@ngx-formly/core/select';

import { FormlyFormFieldModule } from '@ngx-formly/primeng/form-field';
import { FormlyFieldSelect } from './select-type.component';

@NgModule({
  declarations: [FormlyFieldSelect],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    FormlyFormFieldModule,
    FormlyCoreSelectModule,
    FormlyModule.forChild(),
  ],
})
export class SelectTypeModule {}
