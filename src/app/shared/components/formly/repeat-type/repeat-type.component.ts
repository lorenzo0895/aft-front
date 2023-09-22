import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'app-repeat-type',
  templateUrl: './repeat-type.component.html',
  styleUrls: ['./repeat-type.component.scss']
})
export class RepeatTypeComponent extends FieldArrayType {

  override defaultOptions = {
    props: {
      disabled: false,
    }
  };

  ngOnInit() {
    if (this.field.props['remove']) {
      this.field.props['remove'] = this.remove.bind(this);
    }
    if(this.field.fieldGroup?.length === 0) {
      this.add();
    }
  }

  notOnlyOne() {
    return (this.field.fieldGroup?.length ?? 0) > 1;
  }
}
