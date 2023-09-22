import { Component } from '@angular/core';
import { BaseTypeComponent } from '../base-type/base-type.component';
import { FormlyFieldProps } from '@ngx-formly/core';

interface HTMLType extends FormlyFieldProps{
  innerHTML: string;
}

@Component({
  selector: 'app-html-type',
  templateUrl: './html-type.component.html',
  styleUrls: ['./html-type.component.scss']
})
export class HtmlTypeComponent extends BaseTypeComponent<HTMLType>{

}
