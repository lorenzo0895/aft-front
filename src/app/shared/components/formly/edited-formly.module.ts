import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyFieldSelect } from '@shared/components/formly/select-type/select-type.component';
import { CalendarTypeComponent } from '@shared/components/formly/calendar-type/calendar-type.component';
// import { FormlyFieldRadio } from '@ngx-formly/primeng/radio';
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
import { EditedFormlyComponent } from './formly.component';
import { FormlyCheckboxModule, FormlyFieldCheckbox } from '@ngx-formly/primeng/checkbox';
import { FormlyFieldRadio, FormlyRadioModule } from '@ngx-formly/primeng/radio';

export const match = (
  a: AbstractControl,
  f: FormlyFieldConfig,
  options: any
) => {
  if (f.model?.[options.field1] === f.model?.[options.field2]) return null;
  return { match: true };
};

@NgModule({
  declarations: [
    EditedFormlyComponent,
  ],
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
    FormlyCheckboxModule,
    FormlyRadioModule,
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
      types: [
        { name: 'autocomplete', component: AutocompleteTypeComponent, defaultOptions: { wrappers: [FormlyWrapperFormField] } },
        { name: 'calendar', component: CalendarTypeComponent, defaultOptions: { wrappers: [FormlyWrapperFormField] } },
        { name: 'input', component: InputTypeComponent, defaultOptions: { wrappers: [FormlyWrapperFormField] } },
        { name: 'select', component: FormlyFieldSelect, defaultOptions: { wrappers: [FormlyWrapperFormField] } },
        { name: 'dropdown', component: DropdownTypeComponent },
        { name: 'checkbox', component: FormlyFieldCheckbox },
        { name: 'repeat', component: RepeatTypeComponent },
        { name: 'switch', component: SwitchTypeComponent },
        { name: 'button', component: ButtonTypeComponent },
        { name: 'file', component: FileTypeComponent },
        { name: 'radio', component: FormlyFieldRadio },
        { name: 'html', component: HtmlTypeComponent },
        { name: 'icon', component: IconTypeComponent },
      ],
    }),
  ],
  exports: [
    EditedFormlyComponent,
  ]
})
export class EditedFormlyModule {}
