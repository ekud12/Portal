import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoiceStatus'
})
export class InvoiceStatusPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (args === 'statusField') {
      switch (value) {
        case '1':
          return 'בהקלדה';
        case '8':
          return 'בהקלדה זמן רב';
        case '2':
          return 'ממתין';
        case '9':
          return 'סגורה';
        default:
          return value;
      }
    } else {
      return value;
    }
  }
}
