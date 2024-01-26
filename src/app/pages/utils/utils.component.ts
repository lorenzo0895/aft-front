import { Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ModalService } from '@shared/components/modal/modal.service';
import { minutaModalData, exportSalesModalData } from './constants/modals';
import { ReceiptsService } from '@shared/services/receipts.service';
import { ExcelService } from '@shared/services/excel.service';
import { ConceptsService } from '@shared/services/concepts.service';
import { ClientsService } from '@shared/services/clients.service';
import { OthersComponent } from './components/others/others.component';

@Component({
  selector: 'app-utils',
  standalone: true,
  imports: [CardModule, OthersComponent],
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss'],
})
export class UtilsComponent {
  concepts: any[] = [];
  clients: any[] = [];
  showingOthers = signal<boolean>(false);
  cards: any[] = [
    { 
      header: 'Exportar Facturación',
      subheader: 'Exporta un excel con el resumen facturado en un rango de fechas',
      subtitle: 'Genera reportes de Honorarios cobrados por el estudio dentro de un rango de fechas específico con formato legible.',
      onClick: this.exportSales.bind(this),
      img: 'assets/img/card2.png',
    },
    { 
      header: 'Reporte Minuta',
      subheader: 'Reportes diarios, mensuales, semanales, etc',
      subtitle: 'Genere reportes de Comprobantes de Caja emitidos en un rango de fechas, ordenados de diversas formas y con el detalle de cada uno de sus Netos.',
      onClick: this.minuta.bind(this),
      img: 'assets/img/card1.png',
    },
    { 
      header: 'Otros',
      subheader: 'Colección de herramientas',
      subtitle: 'Transforma datos con la ayuda de diversas herramientas',
      onClick: this.others.bind(this),
      img: 'assets/img/lines_waves.jpg',
    },
  ];

  constructor(
    private _modalService: ModalService,
    private _excelervice: ExcelService,
    private _clientsService: ClientsService,
    private _receiptsService: ReceiptsService,
    private _conceptsService: ConceptsService,
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

  exportSales() {
    const dialogRef = this._modalService.open(exportSalesModalData(this));
    dialogRef.componentInstance.onSubmit.subscribe((model) => {
      this._receiptsService
        .exportSales({ start: model.start, end: model.end })
        .subscribe((res: any[]) => {
            this._excelervice
              .exportSales(res, model, 'Facturacion.xls')
              .subscribe();
          });
    });
  }

  others() {
    this.showingOthers.update(x => !x);
  }

}
