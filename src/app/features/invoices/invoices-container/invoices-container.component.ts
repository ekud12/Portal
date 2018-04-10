import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Sapak } from '../../user/models/sapak.model';
import { Store } from '@ngrx/store';
import * as fromInvoiceStore from '@invoicesStore';
import * as fromSharedStore from '@sharedStore';
import * as fromUserStore from '@userStore';
import { Router } from '@angular/router';
import { Invoice, InvoiceRow } from '../models/new-actions.model';

@Component({
  selector: 'app-invoices-container',
  templateUrl: './invoices-container.component.html',
  styleUrls: ['./invoices-container.component.css']
})
export class InvoicesContainerComponent implements OnInit {
  currentSapak$: Observable<Sapak>;
  loggedUserName$: Observable<string>;
  currentInvoice$: Observable<Invoice>;
  currentInvoiceRow$: Observable<InvoiceRow>;
  userName: string;

  constructor(
    private invoiceStore: Store<fromInvoiceStore.InvoiceState>,
    private router: Router,
    private userStore: Store<fromUserStore.UserState>
  ) {
    this.loggedUserName$ = this.userStore.select(fromUserStore.userNameSelector);
    this.currentSapak$ = this.userStore.select(fromUserStore.activeSapakSelector);
    this.currentInvoice$ = this.invoiceStore.select(fromInvoiceStore.currentInvoiceSelector);
    this.currentInvoiceRow$ = this.invoiceStore.select(fromInvoiceStore.currentInvoiceRowSelector);
  }

  ngOnInit() {
    this.currentInvoice$.subscribe(val => {
      if (!val) {
        this.router.navigate(['/portal/invoices/all']);
      }
    });
  }
}
