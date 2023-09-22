import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldProps } from '@ngx-formly/core';

@Component({
  selector: 'base-input',
  template: ''
})
export class BaseTypeComponent<
  T extends FormlyFieldProps = FormlyFieldProps
> extends FieldType<FieldTypeConfig<T>> {

  constructor() {
    super();
  }

  protected onEvent($event: any, type: string): void {
    switch (type) {
      case 'blur':
        this.field.props?.blur?.(this.field, $event);
        break;
      case 'keyup':
        this.field.props?.keyup?.(this.field, $event);
        break;
      case 'keydown':
        this.field.props?.keydown?.(this.field, $event);
        break;
      case 'click':
        this.field.props?.click?.(this.field, $event);
        break;
      case 'change':
        this.field.props?.change?.(this.field, $event);
        break;
      case 'keypress':
        this.field.props?.keypress?.(this.field, $event);
        break;
    }
  }

}
