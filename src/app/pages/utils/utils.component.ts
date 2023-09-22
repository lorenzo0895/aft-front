import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ModalService } from '@shared/components/modal/modal.service';
import { liqPrimGranosModalData, minutaModalData, xubioModalData } from './constants/modals';
import { ReceiptsService } from '@shared/services/receipts.service';
import { ExcelService } from '@shared/services/excel.service';
import { ConceptsService } from '@shared/services/concepts.service';
import { ClientsService } from '@shared/services/clients.service';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'app-utils',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss'],
})
export class UtilsComponent {
  concepts: any[] = [];
  clients: any[] = [];
  constructor(
    private _modalService: ModalService,
    private _excelervice: ExcelService,
    private _clientsService: ClientsService,
    private _receiptsService: ReceiptsService,
    private _conceptsService: ConceptsService,
    private _utilsService: UtilsService,
  ) {}

  ngOnInit() {
    this._clientsService.getData().subscribe((res) => (this.clients = res));
    this._conceptsService.getData().subscribe((res) => (this.concepts = res));
  }

  minuta() {
    const dialogRef = this._modalService.open(minutaModalData(this));
    dialogRef.componentInstance.onSubmit.subscribe((res) => {
      this._receiptsService.minuta(res).subscribe((list) => {
        this._excelervice
          .minuta(this.concepts, list, 'Reporte Minuta')
          .subscribe();
      });
    });
  }

  xubio() {
    const dialogRef = this._modalService.open(xubioModalData(this));
    dialogRef.componentInstance.onSubmit.subscribe((model) => {
      this._receiptsService
      .xubio({ start: model.start, end: model.end })
      .subscribe((res: any[]) => {
          this._excelervice
            .xubio(res, model, 'Reporte Xubio.xls')
            .subscribe();
        });
    });
  }

  liqPrimGranos() {
    const dialogRef = this._modalService.open(liqPrimGranosModalData(this));
    dialogRef.componentInstance.onSubmit.subscribe(res => {
      console.log(res);
      this._utilsService.liqPrimGranos(res.files).subscribe(res => {
        console.log(res);
        dialogRef.close();
      })
    })
  }
}
