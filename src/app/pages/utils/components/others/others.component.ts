import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { nodes } from './constants/nodes';
import { ExcelService } from '@shared/services/excel.service';
import { ModalService } from '@shared/components/modal/modal.service';
import { of } from 'rxjs';

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
  ) {}
  
  onNodeSelect(event: any) {
    switch(event.node.key) {
      case '0.0.1': // Ventas generales
        this.holistorVtasGenerales();
        break;
    }
  }

  holistorVtasGenerales() {
    const dialogRef = this.modalService.open({
      width: '400px',
      data: {
        title: 'Ventas Generales',
        type: 'new',
        formlyData: {
          fields: [
            {
              key: 'files',
              type: 'file',
              className: 'flex-1',
              props: {
                required: true,
              },
            },
          ]
        },
        disableSubmit: () => of(false),
      }
    })
    dialogRef.componentInstance.onSubmit.subscribe(x => {
      console.log(x);
      this.excelService.holistorVtaGeneral(x.files[0])
    })
  }
}
