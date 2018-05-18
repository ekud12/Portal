import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoiceStatusColor'
})
export class InvoiceStatusColorPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (value) {
      case '1':
        return 'black';
      case '8':
        return 'red';
      case '0':
        return 'purple';
      case '9':
        return 'green';
      default:
        return 'black';
    }
  }
}
