import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IModalData } from '@shared/interfaces/IModalData';
import { BehaviorSubject, Observable, skip, Subscription } from 'rxjs';

@Component({
  selector: 'coa-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('target', { read: ViewContainerRef })
  private _viewContainerRef!: ViewContainerRef;
  private _componentRef!: ComponentRef<any>;
  private _disabledBehSub$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  protected _disabled$: Observable<boolean> =
    this._disabledBehSub$.asObservable();
  private _originalModel!: any;
  private _onSubmit: BehaviorSubject<any> = new BehaviorSubject(null);
  private _onCancel: BehaviorSubject<any> = new BehaviorSubject(null);
  onSubmit: Observable<any> = this._onSubmit
    .asObservable()
    .pipe(skip(1));
  onCancel: Observable<any> = this._onCancel
    .asObservable()
    .pipe(skip(1));
  private _subscription!: Subscription;
  protected form!: FormGroup;
  protected model!: any;
  protected fields!: FormlyFieldConfig[];
  protected options!: FormlyFormOptions;

  constructor(
    private _cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: IModalData
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    //Lo copiamos así porque si un atributo es un objeto se copia por referencia
    this._originalModel = structuredClone(this.data.formlyData?.model ?? {})
    this.model = this.data.formlyData?.model ?? {};
    this.fields = this.data.formlyData?.fields ?? [];
    this.options = this.data.formlyData?.options ?? {};
    this._checkDisabled();
  }

  ngAfterViewInit(): void {
    if (this.data.type === 'new') {
      this.form.reset();
    }
    if (this.data.component) {
      this._componentRef = this._viewContainerRef.createComponent(
        this.data.component
      );
      const inputs = this.data.componentParams
        ? Object.entries(this.data.componentParams)
        : [];
      for (const input of inputs) {
        this._componentRef.setInput(input[0], input[1]);
      }
    }
    if (this.data.disableSubmit) {
      this._disabled$ = this.data.disableSubmit(
        this._componentRef?.instance ?? undefined,
        this.model ?? undefined
      );
    }
    this._cd.detectChanges();
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  protected _onSubmitEvent(event: any) {
    if (this.data.onSubmit) {
      this._onSubmit.next(
        this.data.onSubmit(
          this._componentRef?.instance ?? undefined,
          this.model ?? undefined
        )
      );
    } else {
      this._onSubmit.next(event);
    }
  }

  protected _onCancelEvent() {
    this._onCancel.next(null);
  }

  private _checkDisabled() {
    if (this.data.disableSubmit) return;
    const type = this.data.type;
    if (type !== 'edit' && type !== 'new') return;
    this._subscription = this.form.valueChanges.subscribe((changes) => {
      setTimeout(() => {
        if (this.isOriginalModel() || this.form.invalid) {
          this._disabledBehSub$.next(true);
        } else {
          this._disabledBehSub$.next(false);
        }
      }, 0)
    });
  }

  private isOriginalModel(): boolean {
    let modelCopy: any = {};
    //Con esto podemos chequear si el objeto es igual obviando los atributos nulos o undefined
    Object.entries(this.model).forEach(([key, value]) => {
      if (value !== undefined && value !== null) modelCopy[key] = value;
    });
    return JSON.stringify(this._originalModel) === JSON.stringify(modelCopy);
  }
}
