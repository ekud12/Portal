import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoiceStatus'
})
export class InvoiceStatusPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (value) {
      case 0:
        return 'בהקלדה';
      case 1:
        return 'בהקלדה זמן רב';
      case 2:
        return 'ממתין';
      case 3:
        return 'סגורה';
      default:
        return 'סוג לא ידוע';
    }
  }
}
