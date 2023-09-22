import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FieldWrapper,
  FormlyFieldConfig,
  FormlyFieldProps as CoreFormlyFieldProps,
} from '@ngx-formly/core';

export interface FormlyFieldProps extends CoreFormlyFieldProps {
  hideRequiredMarker?: boolean;
  hideLabel?: boolean;
}

@Component({
  selector: 'formly-wrapper-primeng-form-field',
  template: `
    <div class="p-field p-col-12 p-md-4">
      <span class="p-float-label" #pFloatLabel>
        <label [for]="id">
          {{ props.label }}
          <span
            *ngIf="props.required && props.hideRequiredMarker !== true"
            aria-hidden="true"
            >*</span
          >
        </label>
        <ng-container #fieldComponent></ng-container>
      </span>
      <small *ngIf="showError" class="p-error">
        <formly-validation-message
          class="ui-message-text"
          [field]="field"
        ></formly-validation-message>
      </small>
    </div>
  `,
  styleUrls: ['./formly-field.scss'],
})
export class FormlyWrapperFormField
  extends FieldWrapper<FormlyFieldConfig<FormlyFieldProps>>
{
  @ViewChild('pFloatLabel', { static: true })
  span!: ElementRef<HTMLSpanElement>;

  _cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  @HostBinding('class.wrapper-filled')
  private get _filled() {
    return !['', undefined, null].includes(this.formControl.value);
  }
  @HostBinding('class.wrapper-focused')
  private get _focused() {
    const input = this.span.nativeElement.getElementsByTagName('input').item(0);
    return input === document.activeElement;
  }

  @HostListener('click')
  click() {
    this._cd.detectChanges();
  }

}
