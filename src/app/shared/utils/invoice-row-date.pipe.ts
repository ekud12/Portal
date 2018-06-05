import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'invoiceRowDate'
})
export class InvoiceRowDatePipe implements PipeTransform {
  constructor(private pipe: DatePipe) {}

  transform(value: any, args?: any): any {
    if (args === 'billMonthField' || args === 'printSpecialDate' || args === 'yearBillMonthField') {
      // const year = value.toString().substr(0, 4);
      // const month = value.toString().substr(4, 2);
      // return `${month}/${year}`;
      return ``;
    } else {
      return value;
    }
  }
}
