import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { RepeatTypeComponent } from './repeat-type.component';

@NgModule({
  declarations: [RepeatTypeComponent],
  imports: [
    CommonModule,
    FormsModule,
    FormlyModule.forChild(),
  ],
  exports: [
    RepeatTypeComponent
  ]
})
export class RepeatTypeModule { }
