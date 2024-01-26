import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';

import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from './services/spinner.service';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule, MatProgressSpinnerModule, OverlayModule],
  exports: [SpinnerComponent],
  providers: [SpinnerService],
})
export class SpinnerModule {}
