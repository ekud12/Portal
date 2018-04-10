import { Injectable } from '@angular/core';
import { BackendService } from '../../core/services/backend.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { SapakDataRequest } from '../user/models/sapak.model';

@Injectable()
export class InvoicesService {
  constructor(private backendService: BackendService) {}

  getAllInvoicesForSapak(request: SapakDataRequest): Observable<any> {
    return Observable.of([
      { invoiceNum: 4015, billMonth: '12/2018', totalRowsNum: 1, invoiceSum: 581, status: 0 },
      { invoiceNum: 999, billMonth: '12/2018', totalRowsNum: 1, invoiceSum: 157, status: 1 },
      { invoiceNum: 4866, billMonth: '11/2018', totalRowsNum: 1, invoiceSum: 1874, status: 0 }
    ]);
  }
}
