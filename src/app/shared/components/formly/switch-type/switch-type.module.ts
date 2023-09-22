import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchTypeComponent } from './switch-type.component';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [
    SwitchTypeComponent
  ],
  imports: [
    CommonModule,
    InputSwitchModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
  ]
})
export class SwitchTypeModule { }
