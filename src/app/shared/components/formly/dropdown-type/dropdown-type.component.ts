import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseTypeComponent } from '../base-type/base-type.component';
import { DropdownPosition } from '@ng-select/ng-select';
import { FieldTypeConfig, FormlyFieldProps } from '@ngx-formly/core';
import { FormlyAttributeEvent } from '@ngx-formly/core/lib/models';

interface DropdownType extends FormlyFieldProps {
  multiple: boolean;
  clearable: boolean;
  searchable: boolean;
  acceptCustomTags: boolean;
  onAddTag?: FormlyAttributeEvent;
  attributes: {
    bindValueOp: string;
    bindLabelOp: string;
    groupBy: string;
    dropdownPosition: DropdownPosition;
    maxVisibleItems: number;
    clearable?: 'true' | 'false';
    searchable?: 'true' | 'false';
    multiple?: 'true' | 'false';
  };
}

@Component({
  selector: 'dropdown-type',
  templateUrl: './dropdown-type.component.html',
  styleUrls: ['./dropdown-type.component.scss'],
})
export class DropdownTypeComponent
extends BaseTypeComponent<DropdownType>
implements OnInit, AfterViewInit
{
  addTagFn = this._addTagFn.bind(this);
  override defaultOptions?: Partial<FieldTypeConfig<DropdownType>> = {
    props: {
      multiple: false,
      clearable: false,
      searchable: true,
      acceptCustomTags: false,
      attributes: {
        bindValueOp: '',
        bindLabelOp: 'value',
        groupBy: '',
        dropdownPosition: 'auto',
        maxVisibleItems: 4,
      },
    },
  };

  constructor(private _cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    if (this.props.attributes?.['clearable'] === 'true') {
      this.props.clearable = true;
    }
    if (this.props.attributes?.['searchable'] === 'false') {
      this.props.searchable = false;
    }
    if (this.props.attributes?.['multiple'] === 'true') {
      this.props.multiple = true;
    }
  }

  ngAfterViewInit(): void {
    this._cd.detectChanges();
  }

  get dataOptions(): Observable<any[] | null> {
    return this.props.options instanceof Observable
      ? this.props.options
      : of(this.props.options ?? null);
  }

  private _addTagFn(name: string): any {
    let newTag: any = {
      id: null,
      value: name,
      isNewTag: true,
      [this.props.attributes.bindLabelOp]: name,
    };
    if (this.props.attributes.bindValueOp !== '') {
      newTag = {
        [this.props.attributes.bindValueOp]: { ...newTag },
        [this.props.attributes.bindLabelOp]: name,
      };
    }
    this.field?.props?.['onAddTag']?.(this.field, name);
    return newTag;
  }
}
