import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as userActions from '../actions';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import * as fromRoot from '../../../../core/store';
import * as userStore from '@userStore';
import { InvoicesService } from '../../invoices.service';
import { SapakDataRequest } from '../../../user/models/sapak.model';
import { ToastService } from '../../../../core/services/toast-service.service';
import { InvoiceRowDatePipe } from 'app/shared/utils/invoice-row-date.pipe';
import { NewInvoiceRequest } from '../../models/requests-models/requests';

@Injectable()
export class InvoiceEffects {
  constructor(
    private actions$: Actions,
    private invoicesService: InvoicesService,
    private toaster: ToastService,
    private invoiceDatePipe: InvoiceRowDatePipe
  ) {}

  @Effect()
  getInvoices$ = this.actions$.ofType(userActions.GET_INVOICES).pipe(
    map((action: userActions.GetInvoices) => action.payload),
    switchMap((allInvoicesRequest: SapakDataRequest) => {
      return this.invoicesService
        .getAllInvoicesForSapak(allInvoicesRequest)
        .pipe(
          switchMap(res => [new userActions.GetInvoicesSuccess(res)]),
          catchError(error => of(new userActions.GetInvoicesFail(error)))
        );
    })
  );

  @Effect()
  /** add call to action: get rows for invoice */
  activateInvoice$ = this.actions$.ofType(userActions.ACTIVATE_INVOICE).pipe(
    map((action: userActions.ActivateInvoice) => action.payload),
    tap(val => {
      this.toaster.openSnackBar(`חשבונית מס' ${val.invoice.invoiceNumField} נבחרה כפעילה.`, null);
      return val;
    }),
    switchMap(val => [
      new userActions.GetInvoiceRows(val),
      new fromRoot.Go({ path: ['/portal/invoices/rows'] })])
  );

  @Effect()
  createInvoice$ = this.actions$.ofType(userActions.CREATE_INVOICE).pipe(
    map((action: userActions.CreateInvoice) => action.payload),
    switchMap((newInvoicesRequest: NewInvoiceRequest) => {
      return this.invoicesService
        .createInvoice(newInvoicesRequest)
        .pipe(
          switchMap(res => [new userActions.CreateInvoiceSuccess(res, newInvoicesRequest)]),
          catchError(error => of(new userActions.CreateInvoiceFail(error)))
        );
    })
  );

  @Effect()
  createInvoiceSuccess$ = this.actions$.ofType(userActions.CREATE_INVOICE_SUCCESS).pipe(
    map((action: userActions.CreateInvoiceSuccess) => action.reqRef),
    tap(val => {
      this.toaster.openSnackBar(`חשבונית מס' ${val.invoiceNum} נוצרה בהצלחה.`, null);
    }),
    map(val => {
      const r = new SapakDataRequest();
      r.userName = val.userName;
      r.kodSapak = val.kodSapak;
      return r;
    }),
    switchMap((val: SapakDataRequest) => [
      new userActions.GetInvoices(val),
      new fromRoot.Go({
        path: ['/portal/invoices/all']
      })
    ])
  );

  @Effect({ dispatch: false })
  createInvoiceFailure$ = this.actions$.ofType(userActions.CREATE_INVOICE_FAIL).pipe(
    map((action: userActions.CreateInvoiceFail) => action.payload),
    tap(error => {
      this.toaster.openSnackBar(`${error.errors[0]}`, null);
    })
  );

  @Effect()
  resetInvoicesStore$ = this.actions$
    .ofType(userActions.GET_INVOICES_FAIL)
    .pipe(switchMap(val => [new userActions.ResetInvoices()]));
}
