import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as fromRoot from '@coreStore';
import * as fromInvoiceStore from '@invoicesStore';
import { Store } from '@ngrx/store';
import * as fromUserStore from '@userStore';
import { Observable } from 'rxjs/Observable';
import { Sapak } from '../../../user/models/sapak.model';
import { Invoice, InvoiceRow } from '../../models/class-models/objects.model';

@Component({
  selector: 'app-global-invoice-details',
  templateUrl: './global-invoice-details.component.html',
  styleUrls: ['./global-invoice-details.component.css']
})
export class GlobalInvoiceDetailsComponent implements OnInit {
  @Input() toHide: boolean;
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

  ngOnInit() {}
}
