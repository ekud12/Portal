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
        return 'blue';
      case 2:
        return '#ff5151';
      case 3:
        return 'green';
      default:
        return 'purple';
    }
  }
}
