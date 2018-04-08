import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.css']
})
export class PrintLayoutComponent implements OnInit {
  date = new Date();
  dataSource: MyDataSource;
  dataSubject = new BehaviorSubject<any[]>([]);
  @Input() headerDetailsText1 = 'קוד ספק:';
  @Input() headerDetailsText2 = 'שם ספק:';
  @Input() headerDetailsValue1 = '999999';
  @Input() headerDetailsValue2 = 'test';
  @Input() subHeader = 'ריכוז חשבוניות';
  @Input() btn1Action = 'הדפס';
  @Input() isInvoiceAction = true;
  @Input() mainHeader = 'ריכוז חשבוניות עבור חודש בלה בלה';
  @Input() isTableContent = true;
  @Input() lowerContent = [{ desc: 'פרטי ספק ב SAP:', value: 'TBD' }, { desc: 'מספר ח.פ: ', value: 'TBD' }];
  @Input() recipient = { greeting: 'לכבוד מאוחדת', address: 'אבן גבירול 124', city: 'תל אביב' };

  @Input() displayedColumns: any[] = ['invoiceDate', 'invoiceId', 'invoiceTotalRows', 'invoiceTotalSum', 'invoiceStatus'];
  @Input()
  dismap: any[] = [
    { value: 'invoiceDate', viewValue: 'תאריך חשבונית' },
    { value: 'invoiceId', viewValue: 'מספר חשבונית' },
    { value: 'invoiceTotalRows', viewValue: 'סה"כ שורות' },
    { value: 'invoiceTotalSum', viewValue: 'סכום חשבונית' },
    { value: 'invoiceStatus', viewValue: 'סטטוס חשבונית' }
  ];

  @Input()
  data: any[] = [
    { invoiceId: 4987, invoiceDate: '12/2018', invoiceTotalRows: 5, invoiceTotalSum: 1579, invoiceStatus: 0 },
    { invoiceId: 1417, invoiceDate: '11/2018', invoiceTotalRows: 12, invoiceTotalSum: 1909, invoiceStatus: 1 },
    { invoiceId: 2417, invoiceDate: '10/2018', invoiceTotalRows: 1, invoiceTotalSum: 10099, invoiceStatus: 0 },
    { invoiceId: 3517, invoiceDate: '09/2018', invoiceTotalRows: 0, invoiceTotalSum: 19889, invoiceStatus: 1 },
    { invoiceId: 1717, invoiceDate: '08/2018', invoiceTotalRows: 55, invoiceTotalSum: 1979, invoiceStatus: 1 },
    { invoiceId: 5817, invoiceDate: '07/2018', invoiceTotalRows: 53, invoiceTotalSum: 199, invoiceStatus: 2 },
    { invoiceId: 9117, invoiceDate: '06/2018', invoiceTotalRows: 18, invoiceTotalSum: 5499, invoiceStatus: 1 },
    { invoiceId: 1217, invoiceDate: '05/2018', invoiceTotalRows: 9, invoiceTotalSum: 7499, invoiceStatus: 2 },
    { invoiceId: 2212, invoiceDate: '04/2018', invoiceTotalRows: 31, invoiceTotalSum: 899, invoiceStatus: 1 },
    { invoiceId: 1713, invoiceDate: '03/2018', invoiceTotalRows: 4, invoiceTotalSum: 159, invoiceStatus: 1 },
    { invoiceId: 5217, invoiceDate: '02/2018', invoiceTotalRows: 2, invoiceTotalSum: 299, invoiceStatus: 3 },
    { invoiceId: 3117, invoiceDate: '01/2018', invoiceTotalRows: 111, invoiceTotalSum: 20199, invoiceStatus: 1 }
  ];

  constructor() {}

  ngOnInit() {
    this.dataSource = new MyDataSource(this.dataSubject);

    this.dataSubject.next(this.data);
  }
  getViewValue(v) {
    console.log(this.dismap.find(a => a.value === v).viewValue);
    return this.dismap.find(a => a.value === v).viewValue;
  }
}

export class MyDataSource extends DataSource<any[]> {
  constructor(private subject: BehaviorSubject<any[]>) {
    super();
  }
  connect(): Observable<any[]> {
    return this.subject.asObservable();
  }
  disconnect(): void {}
}
