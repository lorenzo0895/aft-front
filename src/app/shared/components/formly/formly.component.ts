import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-formly',
  templateUrl: './formly.component.html',
  styleUrl: './formly.component.scss'
})
export class EditedFormlyComponent {
  @Input() form: FormGroup = new FormGroup({});
  @Input() options: FormlyFormOptions = {};
  @Input() fields: FormlyFieldConfig[] = [];
  @Input() model: any = {};

}
