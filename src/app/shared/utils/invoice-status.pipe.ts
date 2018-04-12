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
        return 'ממתין';
      case 2:
        return 'ממתין זמן רב';
      case 3:
        return 'סגורה';
      default:
        return 'סוג לא ידוע';
    }
  }
}
