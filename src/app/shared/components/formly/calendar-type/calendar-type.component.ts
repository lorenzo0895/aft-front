import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { language } from '@shared/constants/primeng';
import { PrimeNGConfig } from 'primeng/api';
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'calendar-type',
  templateUrl: './calendar-type.component.html',
  styleUrls: ['./calendar-type.component.scss'],
  host: {
    '[style.width]': '"100%"',
  },
})
export class CalendarTypeComponent extends FieldType implements OnInit {
  @ViewChild(Calendar) calendar!: Calendar;
  label!: string;
  placeholder!: string;
  type!: 'single' | 'range';
  showTime!: boolean;
  timeOnly!: boolean;
  showSeconds!: boolean;
  date: any = undefined;
  numberOfMonths!: number;

  constructor(private _primeNgConfig: PrimeNGConfig) {
    super();
  }

  ngOnInit(): void {
    this.setAttributes();
    this._primeNgConfig.setTranslation(language);
  }

  private setAttributes(): void {
    this.label = this.props.label || '';
    this.placeholder = this.props.placeholder || '';
    this.type = this.props.type as typeof this.type || 'single';
    this.numberOfMonths = Number(this.props?.attributes?.['numberOfMonths'] || 1);
    this.showTime = this.props?.attributes?.['showTime'] === 'true';
    this.timeOnly = this.props?.attributes?.['timeOnly'] === 'true';
    this.showSeconds = this.props?.attributes?.['showSeconds'] === 'true';
  }

  onClose() {
    if (this.type == 'range' && this.calendar.value[1]) {
      this.calendar.hideOverlay();
    }
  }
}
