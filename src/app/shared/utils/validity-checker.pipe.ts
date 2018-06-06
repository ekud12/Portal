import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validityChecker'
})
export class ValidityCheckerPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value === null || value === undefined || value === 'null' || value === 'undefined') {
      return '';
    } else {
      return value;
    }
  }
}
