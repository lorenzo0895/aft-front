import { Component } from '@angular/core';
import { BaseTypeComponent } from '../base-type/base-type.component';
import { FormlyFieldProps } from '@ngx-formly/core';

interface AutocompleteTypeProps extends FormlyFieldProps {
  options: string[];
}

@Component({
  selector: 'app-autocomplete-type',
  templateUrl: './autocomplete-type.component.html',
  styleUrls: ['./autocomplete-type.component.scss'],
})
export class AutocompleteTypeComponent extends BaseTypeComponent<AutocompleteTypeProps> {
  protected _suggestions: any[] = [];

  override defaultOptions = {
    props: {
      options: [],
    },
  };

  search(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.props.options.length; i++) {
      if (
        this.props.options[i].toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        filtered.push(this.props.options[i]);
      }
    }

    this._suggestions = filtered;
  }
}
