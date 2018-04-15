import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'invoiceRowDate',
})
export class InvoiceRowDatePipe implements PipeTransform {
  constructor(private pipe: DatePipe) {}

  transform(value: any, args?: any): any {
    if (value && Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value)) {
      return this.pipe.transform(value, 'dd/MM/yyyy');
    } else {
      return value;
    }
  }
}
