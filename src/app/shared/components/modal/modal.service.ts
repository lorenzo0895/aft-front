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
  open(modalData?: MatDialogConfig<IModalData>): MatDialogRef<ModalComponent> {
    const finalConfig = this.setDefaultConfigs(modalData);
    const dialogRef = this._dialog.open(ModalComponent, finalConfig);
    if (finalConfig.data?.closeAfterSubmit) {
      dialogRef.componentInstance.onSubmit.subscribe(() => dialogRef.close());
    }
    return dialogRef;
  }

  private setDefaultConfigs(
    config?: MatDialogConfig<IModalData>
  ): MatDialogConfig<IModalData> {
    return {
      width: config?.width ?? '600px',
      height: config?.height,
      maxHeight: config?.maxHeight,
      maxWidth: config?.maxWidth,
      autoFocus: 'dialog',
      scrollStrategy: this._sso.noop(),
      data: {
        ...config?.data,
        showCancelButton: config?.data?.showCancelButton ?? true,
        formlyData: {
          fields: config?.data?.formlyData?.fields,
          model: { ...config?.data?.formlyData?.model },
          options: { ...config?.data?.formlyData?.options },
        },
        title: config?.data?.title ?? 'Título',
        type: config?.data?.type ?? 'confirmation',
        confirmText: config?.data?.confirmText ?? 'Confirmar',
        cancelText: config?.data?.cancelText ?? 'Cancelar',
        closeAfterSubmit: config?.data?.closeAfterSubmit ?? true,
      },
    };
  }
}
