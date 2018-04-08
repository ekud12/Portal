import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDatepickerInputEvent } from '@angular/material';
import { PageNotFoundComponent } from '../../../../shared/page-not-found/page-not-found.component';
import { InvoicesVars } from './table-utils';
import { Store } from '@ngrx/store';
import * as fromInvoiceStore from '@invoicesStore';
import { Invoice } from '../../models/new-actions.model';
import { FormControl } from '@angular/forms';

export interface Element {
  invoiceId: number;
  invoiceDate: string;
  invoiceTotalRows: number;
  invoiceTotalSum: number;
  invoiceStatus: number;
}

const ELEMENT_DATA: Element[] = [
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

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.css']
})
export class InvoicesListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['invoiceDate', 'invoiceId', 'invoiceTotalRows', 'invoiceTotalSum', 'invoiceStatus'];
  displayedColumnsMap = [
    { value: 'invoiceDate', viewValue: 'תאריך חשבונית' },
    { value: 'invoiceId', viewValue: 'מספר חשבונית' },
    { value: 'invoiceTotalRows', viewValue: 'סה"כ שורות' },
    { value: 'invoiceTotalSum', viewValue: 'סכום חשבונית' },
    { value: 'invoiceStatus', viewValue: 'סטטוס חשבונית' }
  ];
  events: string[] = [];
  vars = {
    hideRequired: true,
    floatLabel: 'never'
  };
  monthInputCtrl: FormControl = new FormControl(new Date(2020, 0, 1));

  visible = true;

  mode = 'MONTH';
  selectedFilter;
  selectedInvoice: Invoice = new Invoice();
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private invoiceStore: Store<fromInvoiceStore.InvoiceState>) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.selectedFilter = { value: 'invoiceId', viewValue: 'מספר חשבונית' };
    // this.dataSource.filterPredicate = (data: Element, filter: string) =>
    //   data[this.selectedFilter.value].toString().includes(filter) || filter === 'all';
    this.dataSource.filterPredicate = (data: Element, filter: string) =>
      data.invoiceId.toString().includes(filter) || filter === 'all';
  }

  openDialog(): void {
    this.dialog.open(PageNotFoundComponent, {
      width: '250px'
    });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  applyFilterInvoiceNumber(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  activateInvoice(row: any) {
    console.log(row);
  }

  setDateLowerBoundry(lowerDate) {
    console.log(lowerDate.value);
  }
}
