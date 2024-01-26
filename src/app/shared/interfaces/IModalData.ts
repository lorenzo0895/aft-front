import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { Observable } from "rxjs";

export interface IFormlyData {
  model?: any;
  fields?: FormlyFieldConfig[];
  options?: FormlyFormOptions;
}

export interface IModalData {
  [key: string]: any,
  /**
   * Modal type. `new`, `edit` or `confirmation`.
   */
  type?: 'new' | 'edit' | 'confirmation' | 'custom';
  /**
   * The text that will be displayed as modal title.
   */
  title?: string;
  /**
   * The text that will be displayed in case of confirmation type modal.
   */
  bodyText?: string;
  /**
   * An object with model, fields and options formly data.
   */
  formlyData?: IFormlyData
  /**
   * The cancel button text. By default it will be "Cancelar".
   */
  cancelText?: string;
  /**
   * The confirm button text. By default it will be "Confirmar".
   */
  confirmText?: string;
  /**
   * Decide whete yo show the cancel button or not. By default will be true.
   */
  showCancelButton?: boolean;
  /**
   * A custom component to be render inside the modal.
   */
  component?: any;
  /**
   * Pass params as Inputs for your custom component.
   */
  componentParams?: any;
  /**
   * Decide if dialog should close after clicking on submit button.
   * By default it will be true.
   */
  closeAfterSubmit?: boolean;
  /**
   * A function that you can use to disable the submit button. By default,
   * it will be:
   *
   * type: `confirmation` = false
   *
   * type: `new` = true if formly form is invalid
   *
   * type: `edit` = true if formly form is invalid or if it has not been
   * changed yet
   */
  disableSubmit?: (componentInstance: any, model: any) => Observable<boolean>,
  /**
   * A function that returns a value which will be emmited in the onSubmit
   * subscription.
   */
  onSubmit?: (componentInstance?: any, model?: any) => any,
}
