import { omit } from 'lodash';

export type DATE_FILTER =
  | 'this_week'
  | 'last_week'
  | 'this_month'
  | 'last_month'
  | 'this_year'
  | 'last_year'
  | 'custom';

export const DATE_FILTER_VALUE: Record<DATE_FILTER, string> = {
  this_week: 'this week',
  last_week: 'last week',
  this_month: 'this month',
  last_month: 'last month',
  this_year: 'this year',
  last_year: 'last year',
  custom: 'custom',
};

export const date_filter_values = Object.entries(
  omit(DATE_FILTER_VALUE, ['custom'])
).map(([key, value]) => {
  return { label: value, value: key as DATE_FILTER };
});
