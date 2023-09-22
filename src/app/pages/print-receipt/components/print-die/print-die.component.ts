import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { cuitFormatter } from '@shared/formatters/cuitFormatter';
import { currencyFormatter } from '@shared/formatters/currencyFormatter';

@Component({
  selector: 'app-print-die',
  templateUrl: './print-die.component.html',
  styleUrls: ['./print-die.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PrintDieComponent implements OnChanges{
  @Input() receipt?: any;
  total: number = 0;

  ngOnChanges(): void {
    if (!this.receipt) return;
    this.total =
      this.receipt?.cash + this.receipt?.transferAmount + this.receipt.cheques?.reduce(
        (acc: number, curr: any) => acc + curr.amount,
        0
      );
  }

  printCuit(value?: string) {
    return value ? cuitFormatter(value) : '';
  }

  padStart(number?: number) {
    return String(number ?? 0).padStart?.(8, '0')
  }

  formatCurrency(value: number) {
    return currencyFormatter(value);
  }

}
