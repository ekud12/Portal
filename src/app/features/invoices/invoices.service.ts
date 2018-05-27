import { Injectable } from '@angular/core';
import { httpRoutes } from '@http-routes';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BackendService } from '../../core/services/backend.service';
import { SapakDataRequest } from '../user/models/sapak.model';
import { Invoice, InvoiceRow, ObligationByCustomerId } from './models/class-models/objects.model';
import { NewInvoiceRequest, ObligationsByCustomerIdRequest } from './models/requests-models/requests';

@Injectable()
export class InvoicesService {
  constructor(private backendService: BackendService) {}

  /** Invoice Actions */
  getAllInvoicesForSapak(request: SapakDataRequest): Observable<Invoice[]> {
    return this.backendService.post<any>(httpRoutes.INVOICES_GET_ALL_INVOICES, request);
  }

  getAllInvoiceRows(request: SapakDataRequest): Observable<InvoiceRow[]> {
    const ret = [
      {
        lineNum: 1,
        custIDtype: '1',
        custID: 40,
        custIDBikoret: 6,
        custSecName: 'ישראלי',
        custFirstName: 'ישראל',
        commitmentId: 99999999,
        visitNum: 54,
        amount: 1,
        typedAmount: 550,
        treatmentLine: 3,
        date: new Date(),
        treatmentCode: '01',
        kzzType: '33',
        KzzCode: '44',
        kzzDesc: 'קיזוז התחשבנות',
        kzzLiterally1: '',
        kzzLiterally2: '',
        kzzLiterally3: '',
        kzzLiterally4: '',
        kzzLiterally5: '',
        kzzLiterally6: '',
        KzzStatus: 'תקין',
        kzzStatusDesc: 'תקיןןןן',
        treatmentDesc: 'טיפול של הביוקר',
        cstFormattedId: '1-00000040-6',
        cstFullName: 'ישראל ישראלי'
      },
      {
        lineNum: 2,
        custIDtype: '1',
        custID: 40223123,
        custIDBikoret: 4,
        custSecName: 'אלללי',
        custFirstName: 'אללאששש',
        commitmentId: 14945199,
        visitNum: 5,
        amount: 41,
        typedAmount: 8500,
        treatmentLine: 3,
        date: new Date(),
        treatmentCode: '01',
        kzzType: '33',
        KzzCode: '44',
        kzzDesc: 'קיזוז התחשבנות',
        kzzLiterally1: '',
        kzzLiterally2: '',
        kzzLiterally3: '',
        kzzLiterally4: '',
        kzzLiterally5: '',
        kzzLiterally6: '',
        KzzStatus: 'תקין',
        kzzStatusDesc: 'תקיןןןן',
        treatmentDesc: '2טיפול של הביוקר',
        cstFormattedId: '1-40223123-4',
        cstFullName: ''
      }
    ];
    const retEmpty = [];
    return Observable.of(ret);
  }

  createInvoice(request: NewInvoiceRequest): Observable<boolean> {
    return this.backendService.post<any>(httpRoutes.INVOICES_CREATE_NEW_INVOICE, request);
  }

  /** Misc Actions */
  getMagneticCardReportsForSapak(request: SapakDataRequest): Observable<Invoice[]> {
    return this.backendService.post<any>(httpRoutes.INVOICES_GET_MAGNETIC_CARD_SWIPES_FOR_SAPAK, request);
  }

  getObligationsByCustomerId(request: ObligationsByCustomerIdRequest): Observable<ObligationByCustomerId[]> {
    return this.backendService.post<any>(httpRoutes.INVOICES_GET_OBLIGATIONS_BY_CUSTOMER_ID, request);
  }

  uploadInvoice(params: any): Observable<any> {
    return this.backendService.post(httpRoutes.FILES_UPLOAD_FILE, {
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
