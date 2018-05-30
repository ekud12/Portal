import { Injectable } from '@angular/core';
import { httpRoutes } from '@http-routes';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BackendService } from '../../core/services/backend.service';
import { SapakDataRequest } from '../user/models/sapak.model';
import { Invoice, InvoiceRow, ObligationByCustomerId } from './models/class-models/objects.model';
import {
  DeleteInvoiceRowRequest,
  GetAllRowsForInvoiceRequest,
  NewInvoiceRequest,
  NewInvoiceRowRequest,
  ObligationsByCustomerIdRequest
} from './models/requests-models/requests';

@Injectable()
export class InvoicesService {
  constructor(private backendService: BackendService) {}

  /** Invoice Actions */
  getAllInvoicesForSapak(request: SapakDataRequest): Observable<Invoice[]> {
    return this.backendService.post<any>(httpRoutes.INVOICES_GET_ALL_INVOICES, request);
  }

  getAllInvoiceRows(request: SapakDataRequest): Observable<InvoiceRow[]> {
    const req = new GetAllRowsForInvoiceRequest();
    req.userName = request.userName;
    req.kodSapak = request.kodSapak;
    req.billMonth = request.invoice.billMonthField;
    req.invoiceNum = request.invoice.invoiceNumField;
    return this.backendService.post<any>(httpRoutes.INVOICES_GET_ALL_ROWS, req);
  }

  createInvoice(request: NewInvoiceRequest): Observable<boolean> {
    return this.backendService.post<any>(httpRoutes.INVOICES_CREATE_NEW_INVOICE, request);
  }

  createInvoiceRow(request: NewInvoiceRowRequest): Observable<boolean> {
    return this.backendService.post<any>(httpRoutes.INVOICES_CREATE_NEW_INVOICE_ROW, request);
  }

  deleteInvoiceRow(request: DeleteInvoiceRowRequest): Observable<boolean> {
    return this.backendService.delete(httpRoutes.INVOICES_DELETE_INVOICE_ROW, request);
  }

  /** Misc Actions */
  getMagneticCardReportsForSapak(request: SapakDataRequest): Observable<Invoice[]> {
    return this.backendService.post<any>(httpRoutes.INVOICES_GET_MAGNETIC_CARD_SWIPES_FOR_SAPAK, request);
  }

  getObligationsByCustomerId(request: ObligationsByCustomerIdRequest): Observable<ObligationByCustomerId[]> {
    return this.backendService.post<any>(httpRoutes.INVOICES_GET_OBLIGATIONS_BY_CUSTOMER_ID, request);
  }

  uploadInvoice(params: any): Observable<any> {
    return this.backendService.post(httpRoutes.FILES_UPLOAD_SUMMARY, {
      body: this.generateInvoiceFormData(params)
    });
  }

  private generateInvoiceFormData(params: any): FormData {
    const formData: FormData = new FormData();
    // formData.append('month', params.month.toString());
    // formData.append('year', params.year.toString());
    // formData.append('invoiceId', params.invoiceId.toString());
    // formData.append('invoiceType', params.invoiceType.toString());
    if (params.mediaFile) {
      formData.append('mediaFile', params.mediaFile);
    }
    // if (params.invoiceFile) {
    //   formData.append('invoiceFile', params.invoiceFile);
    // }
    formData.append('sapakId', params.sapakId.toString());
    // formData.append('sapakName', params.sapakName);
    formData.append('username', params.username);
    // if (params.transactionId) {
    //   formData.append('transactionId', params.transactionId.toString());
    // }

    return formData;
  }
}
