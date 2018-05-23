import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const d = moment(value, 'YYYY-MM-DDTHH:mm:ss');
    if (args === 'dateField') {
      return d.format('DD/MM/YYYY');
    } else if (args === 'timeField') {
      return d.format('HH:mm:ss');
    } else {
      return value;
    }
  }
}
