import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoiceStatus'
})
export class InvoiceStatusPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (args === 'statusField') {
      switch (value) {
        case '0':
          return 'בהקלדה';
        case '1':
          return 'בהקלדה זמן רב';
        case '6':
          return 'ההקלדה הסתיימה';
        case '7':
          return 'ממתין להשלמות';
        case '8':
          return 'בבדיקה';
        case '9':
          return 'אושרה לתשלום';
        default:
          return value;
      }
    } else {
      return value;
    }
  }
}
