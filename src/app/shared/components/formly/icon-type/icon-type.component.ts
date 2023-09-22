import { Component, HostBinding } from '@angular/core';
import { BaseTypeComponent } from '../base-type/base-type.component';
import { FormlyFieldProps } from '@ngx-formly/core';

interface IconTypeProps extends FormlyFieldProps {
  icon: string;
  tooltip: string;
  className: string;
  tooltipPosition: string;
}

@Component({
  selector: 'app-icon-type',
  templateUrl: './icon-type.component.html',
  styleUrls: ['./icon-type.component.scss']
})
export class IconTypeComponent extends BaseTypeComponent<IconTypeProps> {
  override defaultOptions = {
    props: {
      icon: '',
      tooltip: '',
      className: '',
      tooltipPosition: 'top',
    }
  }

  @HostBinding('class.clickable')
  get clickable() {
    return this.props.click;
  }

  onClick(e: MouseEvent) {
    this.props?.click?.(this.field, e);
  }
}
