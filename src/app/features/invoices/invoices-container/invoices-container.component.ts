import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as fromRoot from '@coreStore';
import * as fromInvoiceStore from '@invoicesStore';
import { Store } from '@ngrx/store';
import * as fromUserStore from '@userStore';
import { moveAnimation } from 'app/core/animations/animations';
import { Observable } from 'rxjs/Observable';
import { Sapak } from '../../user/models/sapak.model';
import { Invoice, InvoiceRow } from '../models/class-models/objects.model';

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
    private routerStore: Store<fromRoot.AppState>,
    private router: Router,
    private userStore: Store<fromUserStore.UserState>
  ) {
    this.loggedUserName$ = this.userStore.select(fromUserStore.userNameSelector);
    this.currentSapak$ = this.userStore.select(fromUserStore.activeSapakSelector);
    this.currentInvoice$ = this.invoiceStore.select(fromInvoiceStore.currentInvoiceSelector);
    this.currentInvoiceRow$ = this.invoiceStore.select(fromInvoiceStore.currentInvoiceRowSelector);
  }

  ngOnInit() {
    this.currentInvoice$.subscribe(invVal => {
      if (!invVal) {
        this.routerStore.dispatch(new fromRoot.Go({ path: ['/portal/invoices/all'] }));
      } else {
        this.currentInvoiceRow$.take(1).subscribe(rowVal => {
          if (!rowVal) {
            this.routerStore.dispatch(new fromRoot.Go({ path: ['/portal/invoices/rows'] }));
          }
        });
      }
    });
  }

  goToCard(event) {
    event.preventDefault();
    event.stopPropagation();
    this.routerStore.dispatch(new fromRoot.Go({ path: ['/portal/invoices/card'], query: { returnURL: '', src: 2 } }));
  }
}
