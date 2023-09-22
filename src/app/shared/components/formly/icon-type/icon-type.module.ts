import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconTypeComponent } from './icon-type.component';
import { FormlyModule } from '@ngx-formly/core';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    IconTypeComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    FormlyModule.forChild(),
  ]
})
export class IconTypeModule { }
