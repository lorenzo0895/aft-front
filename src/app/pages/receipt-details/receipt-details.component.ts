import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormlyFieldConfig,
  FormlyFormOptions,
  FormlyModule,
} from '@ngx-formly/core';
import { ModalService } from '@shared/components/modal/modal.service';
import { defaultGridOptions } from '@shared/constants/agGrid';
import { ConceptsService } from '@shared/services/concepts.service';
import { ReceiptsService } from '@shared/services/receipts.service';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ButtonModule } from 'primeng/button';
import { concatMap, map, Subscription, tap } from 'rxjs';
import { conceptsColDefs } from './constants/agGrid';
import { descriptionField, fields } from './constants/formly';
import {
  cancelModal,
  chequesListModal,
  closeModal,
  conceptModal,
  deleteModal,
  openModal,
} from './constants/modals';
import { ConceptItemsService } from '@shared/services/concept-items.service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { AuthService } from '@shared/services/auth.service';
import { ChipComponent } from '@shared/components/chip/chip.component';

@Component({
  selector: 'app-receipt-details',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormlyModule, AgGridModule, ChipComponent],
  templateUrl: './receipt-details.component.html',
  styleUrls: ['./receipt-details.component.scss'],
})
export class ReceiptDetailsComponent implements OnInit, OnDestroy {
  protected id?: number;
  private set _receipt(value: any) {
    this.receipt = {
      ...value,
      cheques: [...value.cheques, ...value.cancelCheques],
    };
    if (value.cancelReceipt) {
      this.receipt = {
        ...this.receipt,
        cash: -this.receipt.cash,
        transferAmount: -this.receipt.transferAmount,
        cheques: this.receipt.cheques.map((it: any) => ({
          ...it,
          amount: -it.amount,
        })),
      };
    }
    this.descriptionModel = { description: value.description };
  }
  receipt?: any;
  colDefs?: ColDef[] = [];
  gridOptions: GridOptions = { ...defaultGridOptions };
  rowDataConcepts: any[] = [];
  private _sub?: Subscription;
  protected descriptionModel: any = {};
  protected frozenModel: any = {};
  protected fields: FormlyFieldConfig[] = fields(this);
  protected optionsDetails: FormlyFormOptions = {};
  protected descriptionField: FormlyFieldConfig[] = descriptionField(this);

  constructor(
    private _router: Router,
    public authService: AuthService,
    private _modalService: ModalService,
    private _activatedRoute: ActivatedRoute,
    private _messageService: MessageService,
    private _receiptsService: ReceiptsService,
    private _conceptsService: ConceptsService,
    private _conceptItemsService: ConceptItemsService
  ) {}

  ngOnInit(): void {
    this._sub = this._activatedRoute.params
      .pipe(
        map((params) => params['id']),
        tap((id) => (this.id = Number(id))),
        concatMap((id) => this._receiptsService.getOne(id))
      )
      .subscribe((receipt) => {
        this._receipt = receipt;
        this.rowDataConcepts = receipt.conceptItems;
        this.colDefs = conceptsColDefs(this);
        this.checkExpressions();
      });
  }

  checkExpressions() {
    this.frozenModel = {
      day: this.receipt
        ? moment(this.receipt.day.day).format('DD/MM/YYYY')
        : '',
      number: this.receipt ? this.padNumber(this.receipt.number) : '',
      client: this.receipt
        ? this.receipt.client.surname
          ? this.receipt.client.surname + ', ' + this.receipt.client.name
          : this.receipt.client.name
        : '',
      cash: this.receipt?.cash ?? 0,
      transferAmount: this.receipt?.transferAmount ?? 0,
      cheques:
        this.receipt && this.receipt.cheques
          ? this.receipt.cheques.reduce((prev: number, curr: any) => {
              return prev + curr.amount;
            }, 0)
          : 0,
      total:
        this.receipt && this.receipt.cheques
          ? this.receipt.cheques.reduce((prev: number, curr: any) => {
              return prev + curr.amount;
            }, 0) +
            this.receipt.cash +
            this.receipt.transferAmount
          : 0,
      totalConcepts:
        this.receipt && this.rowDataConcepts
          ? this.rowDataConcepts.reduce((prev: number, curr: any) => {
              return Math.round((prev + curr.amount) * 100) / 100;
            }, 0)
          : 0,
    };
    this.frozenModel = {
      ...this.frozenModel,
      toBeDefined: this.frozenModel.total - this.frozenModel.totalConcepts,
    }
    this.optionsDetails.checkExpressions?.(this.descriptionField[0]);
  }

  padNumber(value: number | string) {
    return String(value).padStart(8, '0');
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }

  onShowChequesList() {
    this._modalService.open(chequesListModal(this.receipt));
  }

  onCancel() {
    const dialogRef = this._modalService.open(cancelModal);
    dialogRef.componentInstance.onSubmit.subscribe(() => {
      this._receiptsService
        .cancel(this.receipt.id)
        .subscribe((receipt: any) => {
          this.receipt = {
            ...this.receipt,
            cancelledBy: receipt,
            isActive: false,
            isCancelled: true,
          };
        });
    });
  }

  navigate(routes: string[]) {
    this._router.navigate(routes, { relativeTo: this._activatedRoute });
  }

  onEditDescription() {
    this._receiptsService
      .updateDescription(this.receipt.id, this.descriptionModel.description)
      .subscribe((res) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Cambios guardados exitosamente',
        });
      });
  }

  onCreateConcept() {
    this._conceptsService.getData().subscribe((concepts) => {
      const dialogRef = this._modalService.open(
        conceptModal(concepts, { toBeDefined: this.frozenModel.toBeDefined })
      );
      dialogRef.componentInstance.onSubmit.subscribe((res) => {
        this._conceptItemsService
          .create({ ...res, receipt: this.receipt.id })
          .subscribe((res) => {
            this.rowDataConcepts = [...this.rowDataConcepts, ...res];
            dialogRef.close();
            this.checkExpressions();
          });
      });
    });
  }

  onEditConcept(row: any) {
    const amount = row.amount;
    this._conceptsService.getData().subscribe((concepts) => {
      const dialogRef = this._modalService.open(
        conceptModal(concepts, {
          toBeDefined: this.frozenModel.toBeDefined,
          concept: row.concept.id,
          amount: row.amount,
          description: row.description,
        })
      );
      dialogRef.componentInstance.onSubmit.subscribe((res) => {
        this._conceptItemsService
          .edit(row.id, { ...res, receipt: this.receipt.id })
          .subscribe((res) => {
            this.rowDataConcepts = this.rowDataConcepts.map((it) => {
              return it.id === row.id ? res : it;
            });
            dialogRef.close();
            this.checkExpressions();
          });
      });
    });
  }

  onDeleteConcept(row: any) {
    const amount = row.amount;
    const dialogRef = this._modalService.open(deleteModal);
    dialogRef.componentInstance.onSubmit.subscribe((res) => {
      this._conceptItemsService.delete(row.id).subscribe((res) => {
        this.rowDataConcepts = this.rowDataConcepts.filter((it) => {
          return it.id !== row.id;
        });
        dialogRef.close();
        this.checkExpressions();
      });
    });
  }

  onClose() {
    const dialogRef = this._modalService.open(closeModal);
    dialogRef.componentInstance.onSubmit.subscribe(() => {
      this._receiptsService.close(this.id!).subscribe((res) => {
        this.receipt = {
          ...this.receipt,
          isActive: false,
        };
      });
    });
  }

  onOpen() {
    const dialogRef = this._modalService.open(openModal);
    dialogRef.componentInstance.onSubmit.subscribe(() => {
      this._receiptsService.open(this.id!).subscribe((res) => {
        this.receipt = {
          ...this.receipt,
          isActive: true,
          isCancelled: true,
        };
      });
    });
  }

}
