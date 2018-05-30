import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromRoot from '@coreStore';
import * as fromInvoiceStore from '@invoicesStore';
import { Store } from '@ngrx/store';
import * as fromSharedStore from '@sharedStore';
import * as fromUserStore from '@userStore';
import { ToastService } from 'app/core/services/toast-service.service';
import { Go } from 'app/core/store/actions';
import { AlertDialogComponent } from 'app/shared/alert-dialog/alert-dialog.component';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { PrintObject } from '../../../../shared/global-models/print-object.interface';
import { Sapak, SapakDataRequest } from '../../../user/models/sapak.model';
import {
  Invoice,
  PrintingOption,
  CardSwipeForSapak,
  ObligationByCustomerId,
  InvoiceRow
} from '../../models/class-models/objects.model';
import { InvoiceRowDatePipe } from '../../../../shared/utils/invoice-row-date.pipe';

@Component({
  selector: 'app-kizuz-details',
  templateUrl: './kizuz-details.component.html',
  styleUrls: ['./kizuz-details.component.css']
})
export class KizuzDetailsComponent implements OnInit {
  currentSapak$: Observable<Sapak>;
  loggedUserName$: Observable<string>;
  activeInvoiceRow$: Observable<InvoiceRow>;
  isLoading$: Observable<boolean>;
  returnURL;

  constructor(
    private invoiceStore: Store<fromInvoiceStore.InvoicesState>,
    private router: Router,
    private userStore: Store<fromUserStore.UserState>,
    private routerStore: Store<fromRoot.AppState>,
    private activatedRoute: ActivatedRoute
  ) {
    this.loggedUserName$ = this.userStore.select(fromUserStore.userNameSelector);
    this.currentSapak$ = this.userStore.select(fromUserStore.activeSapakSelector);
    this.isLoading$ = this.invoiceStore.select(fromInvoiceStore.miscLoadingSelector);
    this.activeInvoiceRow$ = this.invoiceStore.select(fromInvoiceStore.currentInvoiceRowSelector);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.returnURL = params.returnUrl;
    });
  }

  goBack() {
    this.router.navigateByUrl(this.returnURL);
  }
}
