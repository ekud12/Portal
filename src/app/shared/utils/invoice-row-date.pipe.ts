import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import moment from 'moment';
@Pipe({
  name: 'invoiceRowDate'
})
export class InvoiceRowDatePipe implements PipeTransform {
  constructor(private pipe: DatePipe) {}

  transform(value: any, args?: any): any {
    if (args === 'billMonthField') {
      const year = value.substr(0, 4);
      const month = value.substr(4, 2);
      return `${month}/${year}`;
    } else {
      return value;
    }
  }
}
