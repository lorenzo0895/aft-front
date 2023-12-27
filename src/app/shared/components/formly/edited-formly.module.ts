import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyFieldSelect } from '@shared/components/formly/select-type/select-type.component';
import { CalendarTypeComponent } from '@shared/components/formly/calendar-type/calendar-type.component';
import { FormlyFieldCheckbox } from '@ngx-formly/primeng/checkbox';
import { FormlyFieldRadio } from '@ngx-formly/primeng/radio';
import { CalendarTypeModule } from '@shared/components/formly/calendar-type/calendar-type.module';
import { SelectTypeModule } from '@shared/components/formly/select-type/select-type.module';
import { FormlyWrapperFormFieldModule } from '@shared/components/formly/wrappers/form-field.module';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { DropdownTypeComponent } from './dropdown-type/dropdown-type.component';
import { DropdownTypeModule } from './dropdown-type/dropdown-type.module';
import {
  maxLengthValidationMessage,
  maxValidationMessage,
  minLengthValidationMessage,
  minValidationMessage,
} from './validators/messages';
import { ButtonTypeComponent } from './button-type/button-type.component';
import { ButtonTypeModule } from './button-type/button-type.module';
import { InputTypeComponent } from './input-type/input-type.component';
import { InputTypeModule } from './input-type/input-type.module';
import { FormlyWrapperFormField } from './wrappers/form-field.wrapper';
import { SwitchTypeComponent } from './switch-type/switch-type.component';
import { SwitchTypeModule } from './switch-type/switch-type.module';
import { HtmlTypeComponent } from './html-type/html-type.component';
import { HtmlTypeModule } from './html-type/html-type.module';
import { AbstractControl } from '@angular/forms';
import { IconTypeComponent } from './icon-type/icon-type.component';
import { IconTypeModule } from './icon-type/icon-type.module';
import { AutocompleteTypeModule } from './autocomplete-type/autocomplete-type.module';
import { AutocompleteTypeComponent } from './autocomplete-type/autocomplete-type.component';
import { FileTypeComponent } from './file-type/file-type.component';
import { FileTypeModule } from './file-type/file-type.module';
import { RepeatTypeComponent } from './repeat-type/repeat-type.component';
import { RepeatTypeModule } from './repeat-type/repeat-type.module';
import { FloatWrapperComponent } from './wrappers/float-wrapper/float-wrapper.component';

export const match = (
  a: AbstractControl,
  f: FormlyFieldConfig,
  options: any
) => {
  if (f.model?.[options.field1] === f.model?.[options.field2]) return null;
  return { match: true };
};

@NgModule({
  imports: [
    CommonModule,
    CalendarTypeModule,
    SelectTypeModule,
    FormlyWrapperFormFieldModule,
    DropdownTypeModule,
    ButtonTypeModule,
    InputTypeModule,
    SwitchTypeModule,
    HtmlTypeModule,
    IconTypeModule,
    FileTypeModule,
    AutocompleteTypeModule,
    RepeatTypeModule,
    FormlyModule.forRoot({
      validators: [{ name: 'match', validation: match }],
      validationMessages: [
        { name: 'required', message: 'Campo requerido' },
        { name: 'minLength', message: minLengthValidationMessage },
        { name: 'maxLength', message: maxLengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
        { name: 'match', message: 'Los campos no coinciden' },
      ],
      wrappers: [
        { name: 'form-field', component: FormlyWrapperFormField },
        { name: 'float-wrapper', component: FloatWrapperComponent },
      ],
      types: [
        {
          name: 'input',
          component: InputTypeComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'repeat',
          component: RepeatTypeComponent,
          wrappers: [],
        },
        {
          name: 'select',
          component: FormlyFieldSelect,
          wrappers: ['form-field'],
        },
        {
          name: 'calendar',
          component: CalendarTypeComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'autocomplete',
          component: AutocompleteTypeComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'file',
          component: FileTypeComponent,
          wrappers: [],
        },
        {
          name: 'dropdown',
          component: DropdownTypeComponent,
          wrappers: [],
        },
        { name: 'checkbox', component: FormlyFieldCheckbox, wrappers: [] },
        { name: 'radio', component: FormlyFieldRadio, wrappers: [] },
        { name: 'switch', component: SwitchTypeComponent, wrappers: [] },
        { name: 'html', component: HtmlTypeComponent, wrappers: [] },
        { name: 'button', component: ButtonTypeComponent, wrappers: [] },
        { name: 'icon', component: IconTypeComponent, wrappers: [] },
      ],
    }),
  ],
})
export class EditedFormlyModule {}
