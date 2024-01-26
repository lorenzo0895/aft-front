import { Component } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { nodes } from './constants/nodes';
import { ExcelService } from '@shared/services/excel.service';
import { ModalService } from '@shared/components/modal/modal.service';
import { of } from 'rxjs';
import { balducchiModalData, ventasModalData } from './constants/modals';

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [TreeModule],
  templateUrl: './others.component.html',
  styleUrl: './others.component.scss'
})
export class OthersComponent {
  nodes: TreeNode[] = nodes;

  constructor(
    private excelService: ExcelService,
    private modalService: ModalService,
    private messageService: MessageService,
  ) {}
  
  onNodeSelect(event: any) {
    switch(event.node.key) {
      case '0.0.0': // Ventas generales
        this.balducchi();
        break;
      case '0.0.1': // Compras generales
        this.ventas();
        break;
    }
  }

  balducchi() {
    const dialogRef = this.modalService.open(balducchiModalData)
    dialogRef.componentInstance.onSubmit.subscribe(x => {
      this.excelService.transformarVtasBalducchi(x.files[0]).subscribe(x => {
        if (!x.status) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ha ocurrido un error inesperado',
          })
        } else if (x.status && x.omitted.length === 0) {
          this.messageService.add({
            severity: 'success',
            summary: 'Exportación exitosa',
            detail: 'Se han exportado el archivo exitosamente',
          })
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Alerta',
            detail: `Se exportó el archivo omitiendo la(s) siguiente(s) líneas: ${x.omitted.map(x => [x[0]]).join(', ')}. Para más detalles inspeccione la consola.`,
          })
          console.warn('Se omitieron las siguientes líneas:')
          const table = x.omitted.reduce((acc, curr) => {
            return { ...acc, [curr[0]]: curr[1] };
          }, {})
          console.table(table);
        }
      })
    })
  }

  ventas() {
    const dialogRef = this.modalService.open(ventasModalData)
    dialogRef.componentInstance.onSubmit.subscribe(x => {
      this.excelService.exportSalesAFIP(x);
    })
  }
}
