import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CalendarTypeComponent } from './calendar-type.component';

@NgModule({
  declarations: [CalendarTypeComponent],
  imports: [
    CommonModule,
    FormlyModule.forChild(),
    ReactiveFormsModule,
    CalendarModule,
    InputTextModule,
  ],
  exports: [
    CalendarTypeComponent
  ]
})
export class CalendarTypeModule { }
