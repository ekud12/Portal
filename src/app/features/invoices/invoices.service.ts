import { Injectable } from '@angular/core';
import { BackendService } from '../../core/services/backend.service';
import { GetInvoicesRequest } from './models/new-actions.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class InvoicesService {
  constructor(private backendService: BackendService) {}

  getAllInvoicesForSapak(request: GetInvoicesRequest): Observable<any> {
    return Observable.of([
      { invoiceNum: 1, billMonth: '12/2018', totalRowsNum: 1, invoiceSum: 1579, status: 0 },
      { invoiceNum: 2, billMonth: '12/2018', totalRowsNum: 1, invoiceSum: 1579, status: 0 },
      { invoiceNum: 3, billMonth: '11/2018', totalRowsNum: 1, invoiceSum: 1579, status: 0 }

    ]);
  }
}
