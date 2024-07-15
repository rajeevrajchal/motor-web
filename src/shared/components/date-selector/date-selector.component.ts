import { Component, EventEmitter, Output } from '@angular/core';
import moment from 'moment';
import {
  DATE_FILTER,
  DATE_FILTER_VALUE,
  date_filter_values,
} from '../../../constants/date_filter';

const format = 'MMMM, DD YYYY';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: [],
})
export class DateSelectorComponent {
  date_filter: DATE_FILTER = 'this_month';
  date_filter_from: string = moment().startOf('month').format('YYYY-MM-DD');
  date_filter_to: string = moment().endOf('month').format('YYYY-MM-DD');
  date_filter_const = date_filter_values;

  @Output()
  dateFilterChange: EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log('init data', {
      from: this.date_filter_from,
      to: this.date_filter_to,
      df: this.date_filter,
    });
  }

  private emitDateFilterChange() {
    this.dateFilterChange.emit({
      date_filter: this.date_filter,
      date_filter_from: this.date_filter_from,
      date_filter_to: this.date_filter_to,
    });
  }

  onChangeDatePicker(filter: DATE_FILTER) {
    this.date_filter = filter;
    let startDate: any = '';
    let endDate: any = '';

    switch (this.date_filter) {
      case 'this_week':
        startDate = moment().startOf('isoWeek');
        endDate = moment().endOf('isoWeek');
        break;
      case 'last_week':
        startDate = moment().subtract(1, 'weeks').startOf('isoWeek');
        endDate = moment().subtract(1, 'weeks').endOf('isoWeek');
        break;
      case 'this_month':
        startDate = moment().startOf('month');
        endDate = moment().endOf('month');
        break;
      case 'last_month':
        startDate = moment().subtract(1, 'months').startOf('month');
        endDate = moment().subtract(1, 'months').endOf('month');
        break;
      case 'this_year':
        startDate = moment().startOf('year');
        endDate = moment().endOf('year');
        break;
      case 'last_year':
        startDate = moment().subtract(1, 'years').startOf('year');
        endDate = moment().subtract(1, 'years').endOf('year');
        break;
      default:
        break;
    }
    this.date_filter_from = startDate.format('YYYY-MM-DD');
    this.date_filter_to = endDate.format('YYYY-MM-DD');
    this.emitDateFilterChange();
  }

  onChangeDateFilterValue = (key: 'from' | 'to', event: Event) => {
    const selectElement = event.target as HTMLInputElement;
    this.date_filter = 'custom';
    if (key === 'from') {
      this.date_filter_from = selectElement.value;
    }
    if (key === 'to') {
      this.date_filter_to = selectElement.value;
    }
    this.emitDateFilterChange();
  };

  getLabelForDateFilter() {
    if (this.date_filter === 'custom') {
      return `${moment(this.date_filter_from).format(format)} - ${moment(
        this.date_filter_to
      ).format(format)}`;
    }
    return DATE_FILTER_VALUE[this.date_filter];
  }

  getTitleForDateFilter() {
    return `${moment(this.date_filter_from).format(format)} - ${moment(
      this.date_filter_to
    ).format(format)}`;
  }

  getDateFilterClass(value: DATE_FILTER) {
    const active = this.date_filter === value;
    return `btn btn-sm flex items-start font-normal capitalize ${
      active ? 'btn-primary' : 'btn-ghost'
    }`;
  }
}
