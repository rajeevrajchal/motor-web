import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency',
})
export class FormatCurrencyPipe implements PipeTransform {
  transform(amount: number | string): string {
    const userPreferences = {
      currency: 'USD',
      locale: 'en-US',
    };
    const { currency, locale } = userPreferences;

    if (amount !== undefined && amount !== null) {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
      }).format(Number(amount));
    }
    return '';
  }
}
