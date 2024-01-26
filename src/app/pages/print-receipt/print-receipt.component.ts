import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ReceiptsService } from '@shared/services/receipts.service';
import { ActivatedRoute } from '@angular/router';
import { concatMap, map, Subscription, tap } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { jsPDF } from 'jspdf';
import { cuitFormatter } from '@shared/formatters/cuitFormatter';
import { PrintHeaderComponent } from './components/print-header/print-header.component';
import { PrintGeneralComponent } from './components/print-general/print-general.component';
import { PrintPaymentsComponent } from './components/print-payments/print-payments.component';
import { PrintDieComponent } from './components/print-die/print-die.component';

@Component({
  selector: 'app-print-receipt',
  standalone: true,
  imports: [
    ButtonModule,
    PrintHeaderComponent,
    PrintGeneralComponent,
    PrintPaymentsComponent,
    PrintDieComponent,
  ],
  templateUrl: './print-receipt.component.html',
  styleUrls: ['./print-receipt.component.scss'],
})
export class PrintReceiptComponent implements OnInit, OnDestroy {
  @ViewChild('page') page!: ElementRef<HTMLDivElement>;
  protected id?: string;
  private _sub?: Subscription;
  receipt: any;

  constructor(
    private _receiptsService: ReceiptsService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._sub = this._activatedRoute.params
      .pipe(
        map((params) => params['id']),
        tap((id) => (this.id = id.padStart(8, '0'))),
        concatMap((id) => this._receiptsService.getOne(id))
      )
      .subscribe((receipt) => {
        this.receipt = receipt;
      });
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }

  formatCUIT(value?: string) {
    return value ? cuitFormatter(value) : '';
  }

  onPrint() {
    const doc = new jsPDF();
    doc.html(this.page.nativeElement, {
      callback: (doc) => {
        // doc.save('comprobante_aft_' + this.receipt.number + '.pdf');
        window.open(doc.output('bloburl'), '_blank');
      },
      autoPaging: 'text',
      x: 0,
      y: 0,
      width: 210,
      windowWidth: this.page.nativeElement.clientWidth,
    });
  }

  onWhatsapp() {
    window.open(`https://wa.me/${this.receipt.client.phone}`, '_blank')
  }
}
