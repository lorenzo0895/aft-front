import { Component, ChangeDetectionStrategy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FieldTypeConfig, FormlyFieldProps } from '@ngx-formly/core';
import { BaseTypeComponent } from '../base-type/base-type.component';
import { InputNumber } from 'primeng/inputnumber';

interface InputTypeProps extends FormlyFieldProps {
  type: 'text' | 'number' | 'percentage' | 'password' | 'currency' | 'mask';
  filter: string | RegExp;
  toggleMask: boolean;
  feedback: boolean;
  attributes: {
    currency: string;
    locale: string;
    mask: string;
  };
}

@Component({
  selector: 'input-type',
  templateUrl: './input-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./input-type.component.scss'],
})
export class InputTypeComponent
  extends BaseTypeComponent<InputTypeProps>
  implements OnInit, AfterViewInit
{
  @ViewChild('inputNumber') input!: InputNumber;
  override defaultOptions?: Partial<FieldTypeConfig<InputTypeProps>> = {
    props: {
      type: 'text',
      filter: /.+/,
      toggleMask: true,
      feedback: false,
      attributes: {
        currency: 'ARS',
        locale: 'es-AR',
        mask: '',
      },
    },
  };
  mode: string = 'decimal';

  ngOnInit(): void {
    this.props.disabled && this.formControl.disable();
    this.props.type === 'currency' && (this.mode = 'currency');
  }

  ngAfterViewInit(): void {
    this.input?.onKeyDown?.subscribe((e: KeyboardEvent) => {
      if (e.key !== '.') return;
      const selectionStart: number = (e.target as any).selectionStart;
      const value = this.input.input.nativeElement.value;
      const length = value.length;
      if (this.props.type === 'currency') {
        if (selectionStart !== length - 3) return;
        const position = /,/.exec(value)!.index + 1;
        this.input.input.nativeElement.setSelectionRange(position, position);
      } else if (this.props.type === 'percentage') {
        if (selectionStart !== length - 4) return;
        const position = /,/.exec(value)!.index + 1;
        this.input.input.nativeElement.setSelectionRange(position, position);
      }
    });
  }

  onInput(event: any) {
    this.formControl.setValue(event.value)
  }

}
