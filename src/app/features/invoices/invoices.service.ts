import { Injectable } from '@angular/core';
import { BackendService } from '../../core/services/backend.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { SapakDataRequest } from '../user/models/sapak.model';
import { NewInvoiceRequest, Invoice, InvoiceRow } from './models/new-actions.model';

@Injectable()
export class InvoicesService {
  constructor(private backendService: BackendService) {}

  getAllInvoicesForSapak(request: SapakDataRequest): Observable<Invoice[]> {
    const ret = [
      {
        billMonth: '12/2018',
        invoiceNum: 4015,
        totalRowsNum: 1,
        invoiceSum: 581,
        status: 0,
        invoiceType: 0,
        typedSum: 450,
        exeCode: 'do',
        totalOffset: 5,
        totalKZZApprl: 6,
        rate: 17,
        isVat: 'yes',
        currency: '$',
        vatPer: 0.6,
        remark1: 'fml',
        remark2: 'fml2'
      },
      {
        billMonth: '12/2018',
        invoiceNum: 335,
        totalRowsNum: 1,
        invoiceSum: 581,
        status: 2,
        invoiceType: 0,
        typedSum: 450,
        exeCode: 'do',
        totalOffset: 5,
        totalKZZApprl: 6,
        rate: 17,
        isVat: 'yes',
        currency: '$',
        vatPer: 0.6,
        remark1: 'fml',
        remark2: 'fml2'
      },
      {
        billMonth: '07/2018',
        invoiceNum: 9335,
        totalRowsNum: 1,
        invoiceSum: 581,
        status: 1,
        invoiceType: 0,
        typedSum: 450,
        exeCode: 'do',
        totalOffset: 5,
        totalKZZApprl: 6,
        rate: 17,
        isVat: 'yes',
        currency: '$',
        vatPer: 0.6,
        remark1: 'fml',
        remark2: 'fml2'
      },
      {
        billMonth: '06/2018',
        invoiceNum: 95,
        totalRowsNum: 12,
        invoiceSum: 51,
        status: 3,
        invoiceType: 0,
        typedSum: 4540,
        exeCode: 'do',
        totalOffset: 5,
        totalKZZApprl: 6,
        rate: 17,
        isVat: 'yes',
        currency: 'eu',
        vatPer: 0.6,
        remark1: 'fml',
        remark2: 'fml2'
      }
    ];
    const retEmpty = [];
    return Observable.of(ret);
  }

  getAllInvoiceRows(request: SapakDataRequest): Observable<Invoice[]> {
    const ret = [
      {
        billMonth: '12/2018',
        invoiceNum: 4015,
        totalRowsNum: 1,
        invoiceSum: 581,
        status: 2,
        invoiceType: 0,
        typedSum: 450,
        exeCode: 'do',
        totalOffset: 5,
        totalKZZApprl: 6,
        rate: 17,
        isVat: 'yes',
        currency: '$',
        vatPer: 0.6,
        remark1: 'fml',
        remark2: 'fml2'
      },
      {
        billMonth: '12/2018',
        invoiceNum: 335,
        totalRowsNum: 1,
        invoiceSum: 581,
        status: 0,
        invoiceType: 0,
        typedSum: 450,
        exeCode: 'do',
        totalOffset: 5,
        totalKZZApprl: 6,
        rate: 17,
        isVat: 'yes',
        currency: '$',
        vatPer: 0.6,
        remark1: 'fml',
        remark2: 'fml2'
      },
      {
        billMonth: '07/2018',
        invoiceNum: 9335,
        totalRowsNum: 1,
        invoiceSum: 581,
        status: 0,
        invoiceType: 0,
        typedSum: 450,
        exeCode: 'do',
        totalOffset: 5,
        totalKZZApprl: 6,
        rate: 17,
        isVat: 'yes',
        currency: '$',
        vatPer: 0.6,
        remark1: 'fml',
        remark2: 'fml2'
      }
    ];
    const retEmpty = [];
    return Observable.of(ret);
  }

  createInvoice(request: NewInvoiceRequest): Observable<boolean> {
    return Observable.of(true);
  }
}
