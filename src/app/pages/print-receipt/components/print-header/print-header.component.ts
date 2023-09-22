import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChipComponent } from '@shared/components/chip/chip.component';

@Component({
  selector: 'app-print-header',
  templateUrl: './print-header.component.html',
  styleUrls: ['./print-header.component.scss'],
  standalone: true,
  imports: [CommonModule, ChipComponent],
})
export class PrintHeaderComponent {
  @Input() receipt?: any;

  padStart(number?: number) {
    return String(number ?? 0).padStart?.(8, '0')
  }
}
