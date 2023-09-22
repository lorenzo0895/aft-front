import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonTypeComponent } from './button-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ButtonTypeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormlyModule.forChild(),
  ],
  exports: [ButtonTypeComponent],
})
export class ButtonTypeModule {}
