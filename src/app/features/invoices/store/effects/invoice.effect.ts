import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { InvoiceRowDatePipe } from 'app/shared/utils/invoice-row-date.pipe';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ToastService } from '../../../../core/services/toast-service.service';
import * as fromRoot from '../../../../core/store';
import { SapakDataRequest } from '../../../user/models/sapak.model';
import { InvoicesService } from '../../invoices.service';
import { NewInvoiceRequest } from '../../models/requests-models/requests';
import * as userActions from '../actions';

@Injectable()
export class InvoiceEffects {
  constructor(
    private actions$: Actions,
    private invoicesService: InvoicesService,
    private toaster: ToastService,
    private invoiceDatePipe: InvoiceRowDatePipe
  ) {}

  @Effect()
  getInvoices$ = this.actions$
    .ofType(userActions.GET_INVOICES, userActions.GET_INVOICE_ROWS, userActions.GET_TREATMENTS_FOR_ROW)
    .pipe(
      map((action: userActions.GetInvoices) => action.payload),
      switchMap((request: SapakDataRequest) => {
        return this.invoicesService.getAllInvoicesForSapak(request).pipe(
          switchMap(res => [new userActions.GetInvoicesSuccess(res)]),
          catchError(error => of(new userActions.GetInvoicesFail(error)))
        );
      })
    );

  @Effect()
  refreshActivatedInvoice$ = this.actions$
    .ofType(userActions.GET_INVOICES_SUCCESS)
    .pipe(switchMap(val => [new userActions.UpdateActivateInvoice()]));

  @Effect()
  activateInvoice$ = this.actions$.ofType(userActions.ACTIVATE_INVOICE).pipe(
    map((action: userActions.ActivateInvoice) => action.payload),
    tap(val => {
      this.toaster.openSnackBar(`חשבונית מס' ${val.invoice.invoiceNumField} נבחרה כפעילה.`, null);
      return val;
    }),
    switchMap(val => [
      // new userActions.GetInvoiceRows(val),
      new fromRoot.Go({ path: ['/portal/invoices/rows'] })
    ])
  );

  @Effect()
  createInvoice$ = this.actions$.ofType(userActions.CREATE_INVOICE).pipe(
    map((action: userActions.CreateInvoice) => action.payload),
    switchMap((request: NewInvoiceRequest) => {
      return this.invoicesService.createInvoice(request).pipe(
        switchMap(res => [new userActions.CreateInvoiceSuccess(res, request)]),
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
