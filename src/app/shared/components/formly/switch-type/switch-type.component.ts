import { Component } from '@angular/core';
import { BaseTypeComponent } from '../base-type/base-type.component';
import { FieldTypeConfig } from '@ngx-formly/core';

interface SwitchTypeProps {
  label: string;
}

@Component({
  selector: 'app-switch-type',
  templateUrl: './switch-type.component.html',
  styleUrls: ['./switch-type.component.scss'],
})
export class SwitchTypeComponent extends BaseTypeComponent<SwitchTypeProps> {
  override defaultOptions?: Partial<FieldTypeConfig<SwitchTypeProps>> = {
    props: {
      label: '',
    },
  };
}
