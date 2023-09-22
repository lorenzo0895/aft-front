import { Component } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';

@Component({
  selector: 'app-float-wrapper',
  templateUrl: './float-wrapper.component.html',
  styleUrls: ['./float-wrapper.component.scss']
})
export class FloatWrapperComponent extends FieldWrapper<FormlyFieldConfig<FormlyFieldProps>>{

}
