import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditedFormlyModule } from '../formly/edited-formly.module';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    EditedFormlyModule,
    DragDropModule,
  ],
  exports: [
    ModalComponent,
  ],
})
export class ModalModule {}
