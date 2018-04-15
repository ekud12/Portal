import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoiceStatusColor'
})
export class InvoiceStatusColorPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (value) {
      case 0:
        return 'black';
      case 1:
        return 'red';
      case 2:
        return 'purple';
      case 3:
        return 'green';
      default:
        return 'pink';
    }
  }
}
