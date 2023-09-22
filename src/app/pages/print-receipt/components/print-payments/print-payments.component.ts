import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { cuitFormatter } from '@shared/formatters/cuitFormatter';
import { currencyFormatter } from '@shared/formatters/currencyFormatter';
import { dateFormatter } from '@shared/formatters/dateFormatter';

@Component({
  selector: 'app-print-payments',
  templateUrl: './print-payments.component.html',
  styleUrls: ['./print-payments.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PrintPaymentsComponent implements OnChanges {
  @Input() receipt?: any;
  total: number = 0;
  totalCheques: number = 0;

  ngOnChanges(): void {
    if (!this.receipt) return;
    this.totalCheques = this.receipt.cheques?.reduce(
      (acc: number, curr: any) => acc + curr.amount,
      0
    );
    this.total =
      this.receipt?.cash + this.receipt?.transferAmount + this.totalCheques;
  }

  formatCurrency(value: number) {
    return currencyFormatter(value);
  }

  formatCuit(value: string) {
    return value ? cuitFormatter(value, '-') : '';
  }

  formatDate(day: string) {
    return dateFormatter(day);
  }
}
