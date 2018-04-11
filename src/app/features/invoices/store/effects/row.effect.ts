import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as userActions from '../actions';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import * as fromRoot from '../../../../core/store';
import { InvoicesService } from '../../invoices.service';
import { SapakDataRequest } from '../../../user/models/sapak.model';
import { NewInvoiceRequest } from '../../models/new-actions.model';
import { ToastService } from '../../../../core/services/toast-service.service';

@Injectable()
export class RowEffects {
  constructor(private actions$: Actions, private invoicesService: InvoicesService, private toaster: ToastService) {}

  @Effect()
  activateInvoiceRow$ = this.actions$.ofType(userActions.ACTIVATE_INVOICE_ROW).pipe(
    map((action: userActions.ActivateInvoiceRow) => action.payload),
    tap(val => {
      this.toaster.openSnackBar(`חשבונית מס' ${val.invoiceNum} נבחרה כפעילה.`, null);
    }),
    map(() => {
      return new fromRoot.Go({
        path: ['/portal/invoices/treatments']
      });
    })
  );
  // @Effect()
  // getInvoices$ = this.actions$.ofType(userActions.GET_INVOICES).pipe(
  //   map((action: userActions.GetInvoices) => action.payload),
  //   switchMap((allInvoicesRequest: SapakDataRequest) => {
  //     return this.invoicesService
  //       .getAllInvoicesForSapak(allInvoicesRequest)
  //       .pipe(
  //         switchMap(res => [new userActions.GetInvoicesSuccess(res)]),
  //         catchError(error => of(new userActions.GetInvoicesFail(error)))
  //       );
  //   })
  // );

  // @Effect()
  // createInvoice$ = this.actions$.ofType(userActions.CREATEֹֹֹּ_INVOICE).pipe(
  //   map((action: userActions.CreateInvoice) => action.payload),
  //   switchMap((newInvoicesRequest: NewInvoiceRequest) => {
  //     return this.invoicesService
  //       .createInvoice(newInvoicesRequest)
  //       .pipe(
  //         switchMap(res => [new userActions.CreateInvoiceSuccess(res)]),
  //         catchError(error => of(new userActions.CreateInvoiceFail(error)))
  //       );
  //   })
  // );

  // @Effect()
  // createInvoiceSuccess$ = this.actions$.ofType(userActions.CREATEֹֹֹּ_INVOICE_SUCCESS).pipe(
  //   map((action: userActions.CreateInvoiceSuccess) => action.payload),
  //   tap(val => {
  //     this.toaster.openSnackBar(`שורה מס' ${val} נוספה בהצלחה.`, null);
  //   }),
  //   map(() => {
  //     return new fromRoot.Go({
  //       path: ['/portal/invoices/rows']
  //     });
  //   })
  // );

  // @Effect({ dispatch: false })
  // createInvoiceFailure$ = this.actions$.ofType(userActions.CREATEֹֹֹּ_INVOICE_FAIL).pipe(
  //   map((action: userActions.CreateInvoiceFail) => action.payload),
  //   tap(error => {
  //     this.toaster.openSnackBar(`${error}`, null);
  //   })
  // );
}