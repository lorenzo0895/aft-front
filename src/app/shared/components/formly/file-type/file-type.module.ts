import { NgModule } from '@angular/core';
import { FileTypeComponent } from './file-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileValueAccessor } from './file-value-accessor';
import { FormlyModule } from '@ngx-formly/core';
import { ButtonModule } from 'primeng/button';
import { DragDropDirective } from './drag-drop.directive';

@NgModule({
  declarations: [
    FileTypeComponent,
    FileValueAccessor,
    DragDropDirective,
  ],
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    FormlyModule.forChild(),
  ]
})
export class FileTypeModule { }
