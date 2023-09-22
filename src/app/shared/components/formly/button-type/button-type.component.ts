import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'button-type',
  templateUrl: './button-type.component.html',
  styleUrls: ['./button-type.component.scss'],
})
export class ButtonTypeComponent extends FieldType implements OnInit {
  label!: string;
  get disabled(): Observable<boolean> {
    return of(this.to.disabled ?? false);
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.label = this.to.label ?? 'Submit';
  }

  onClick(event: any) {
    event.preventDefault();
    this.field?.templateOptions?.['click']?.(this.field, event);
  }
}
