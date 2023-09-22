import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownTypeComponent } from './dropdown-type.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [DropdownTypeComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
  ],
  exports: [DropdownTypeComponent],
})
export class DropdownTypeModule {}
