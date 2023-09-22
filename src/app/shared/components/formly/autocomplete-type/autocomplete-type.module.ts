import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteTypeComponent } from './autocomplete-type.component';

@NgModule({
  declarations: [AutocompleteTypeComponent],
  imports: [
    CommonModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
  ]
})
export class AutocompleteTypeModule { }
