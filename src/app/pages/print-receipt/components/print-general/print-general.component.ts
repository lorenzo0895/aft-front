import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { convertirNumeroALetras } from '@shared/constants/numberToLetters';
import { cuitFormatter } from '@shared/formatters/cuitFormatter';

@Component({
  selector: 'app-print-general',
  templateUrl: './print-general.component.html',
  styleUrls: ['./print-general.component.scss'],
  standalone: true,
  imports: [],
})
export class PrintGeneralComponent {
  @Input() receipt?: any;

  printCuit(value?: string) {
    return value ? cuitFormatter(value) : '';
  }

  printNumberToLetters() {
    let amount =
      (this.receipt?.cash ?? 0) + (this.receipt?.transferAmount ?? 0);
    amount =
      amount +
      (this.receipt?.cheques?.reduce(
        (acc: number, curr: any) => acc + curr.amount,
        0
      ) ?? 0);
    const resultado = convertirNumeroALetras(amount);
    return resultado;
  }
}
