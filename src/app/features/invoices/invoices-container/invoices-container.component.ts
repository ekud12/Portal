import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as fromInvoiceStore from '@invoicesStore';
import { Store } from '@ngrx/store';
import * as fromUserStore from '@userStore';
import { Observable } from 'rxjs/Observable';

import { Sapak } from '../../user/models/sapak.model';
import { Invoice, InvoiceRow } from '../models/new-actions.model';
import { fadeAnimation, moveAnimation } from 'app/core/animations/animations';

@Component({
  selector: 'app-invoices-container',
  templateUrl: './invoices-container.component.html',
  styleUrls: ['./invoices-container.component.css'],
  animations: [moveAnimation]
})
export class InvoicesContainerComponent implements OnInit {
  currentSapak$: Observable<Sapak>;
  loggedUserName$: Observable<string>;
  currentInvoice$: Observable<Invoice>;
  currentInvoiceRow$: Observable<InvoiceRow>;
  userName: string;

  constructor(
    private invoiceStore: Store<fromInvoiceStore.InvoicesState>,
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
      } else {
        this.currentInvoiceRow$.take(1).subscribe(val2 => {
          if (!val2) {
            this.router.navigate(['/portal/invoices/rows']);
          }
        });
      }
    });
  }
}
