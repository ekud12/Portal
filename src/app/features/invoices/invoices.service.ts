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
      { invoiceId: 1, invoiceDate: '12/2018', invoiceTotalRows: 1, invoiceTotalSum: 1579, invoiceStatus: 0 },
      { invoiceId: 999, invoiceDate: '11/2018', invoiceTotalRows: 3, invoiceTotalSum: 1909, invoiceStatus: 1 },
      { invoiceId: 1116, invoiceDate: '12/2018', invoiceTotalRows: 2, invoiceTotalSum: 1579, invoiceStatus: 0 }
    ]);
  }
}
