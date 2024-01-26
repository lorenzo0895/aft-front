import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalComponent } from './modal.component';
import { IModalData } from '../../interfaces/IModalData';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private _dialog: MatDialog, private readonly _sso: ScrollStrategyOptions) {}

  /** Open a modal and obtain its dialogRef so that you will be able to
   * subscribe to its onSubmit property.
   *
   * Example:
   * ```typescript
   * const dialogRef = this.modalService.open(modalData)
   * dialogRef.componentInstance.onSubmit.subscribe(...)
   * ```
   * Take into account that, by default, submit button will close the dialog.
   * To avoid this behaviour, set `closeAfterSubmit` to false in
   * modalData.
   */
  open(modalData: MatDialogConfig<IModalData>): MatDialogRef<ModalComponent> {
    const finalConfig = this.setDefaultConfigs(modalData);
    const dialogRef = this._dialog.open(ModalComponent, finalConfig);
    if (finalConfig.data?.closeAfterSubmit) {
      dialogRef.componentInstance.onSubmit.subscribe(() => dialogRef.close());
    }
    return dialogRef;
  }

  private setDefaultConfigs(
    config: MatDialogConfig<IModalData>
  ): MatDialogConfig<IModalData> {
    config.width ??= '600px';
    config.autoFocus ??= 'dialog';
    config.scrollStrategy ??= this._sso.noop();
    config.data ??= {};
    config.data.title ??= 'Título';
    config.data.type ??= 'confirmation';
    config.data.confirmText ??= 'Confirmar';
    config.data.cancelText ??= 'Cancelar';
    config.data.closeAfterSubmit ??= true;
    config.data.showCancelButton ??= true;
    config.data.formlyData ??= {};
    config.data.formlyData.fields ??= [];
    config.data.formlyData.model ??= {};
    config.data.formlyData.options ??= {};
    return config;
  }
}
