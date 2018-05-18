import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'as400Date'
})
export class As400DatePipe implements PipeTransform {
  transform(value: string, args?: any): any {
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    console.log(`${month}/${year}`);
  }
}
