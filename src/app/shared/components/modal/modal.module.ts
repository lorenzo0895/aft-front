import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormlyModule,
    FormlyPrimeNGModule,
    DragDropModule,
  ],
  exports: [
    ModalComponent,
  ],
})
export class ModalModule {}
