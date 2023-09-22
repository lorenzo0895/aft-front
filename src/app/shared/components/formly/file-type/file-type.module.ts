import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileTypeComponent } from './file-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileValueAccessor } from './file-value-accessor';

@NgModule({
  declarations: [
    FileTypeComponent, FileValueAccessor
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class FileTypeModule { }
