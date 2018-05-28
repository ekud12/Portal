import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as userActions from '../actions';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import * as fromRoot from '../../../../core/store';
import { InvoicesService } from '../../invoices.service';
import { SapakDataRequest } from '../../../user/models/sapak.model';
import { ToastService } from '../../../../core/services/toast-service.service';
import { NewInvoiceRowRequest, DeleteInvoiceRowRequest } from '../../models/requests-models/requests';

@Injectable()
export class RowEffects {
  constructor(private actions$: Actions, private invoicesService: InvoicesService, private toaster: ToastService) {}

  @Effect({ dispatch: false })
  activateInvoiceRow$ = this.actions$.ofType(userActions.ACTIVATE_INVOICE_ROW).pipe(
    map((action: userActions.ActivateInvoiceRow) => action.payload),
    tap(val => {
      this.toaster.openSnackBar(`שורה מס' ${val.lineNum} נבחרה כפעילה.`, null);
    })
    // map(() => {
    //   return new fromRoot.Go({
    //     path: ['/portal/invoices/treatments']
    //   });
    // })
  );
  @Effect()
  createInvoiceRow$ = this.actions$.ofType(userActions.CREATE_INVOICE_ROW).pipe(
    map((action: userActions.CreateInvoiceRow) => action.payload),
    switchMap((request: NewInvoiceRowRequest) => {
      return this.invoicesService
        .createInvoiceRow(request)
        .pipe(
          switchMap(res => [new userActions.CreateInvoiceRowSuccess(res)]),
          catchError(error => of(new userActions.CreateInvoiceRowFail(error)))
        );
    })
    // map((action: userActions.CreateInvoiceRow) => action.payload),
    // tap(val => {
    //   this.toaster.openSnackBar(`שורה מס' ${val.lineNum} נבחרה כפעילה.`, null);
    // })
    // map(() => {
    //   return new fromRoot.Go({
    //     path: ['/portal/invoices/treatments']
    //   });
    // })
  );

  @Effect()
  deleteInvoiceRow$ = this.actions$.ofType(userActions.DELETE_INVOICE_ROW).pipe(
    map((action: userActions.DeleteInvoiceRow) => action.payload),
    switchMap((request: DeleteInvoiceRowRequest) => {
      return this.invoicesService
        .deleteInvoiceRow(request)
        .pipe(
          switchMap(res => [new userActions.DeleteInvoiceRowSuccess(res)]),
          catchError(error => of(new userActions.DeleteInvoiceRowFail(error)))
        );
    })
    // map((action: userActions.CreateInvoiceRow) => action.payload),
    // tap(val => {
    //   this.toaster.openSnackBar(`שורה מס' ${val.lineNum} נבחרה כפעילה.`, null);
    // })
    // map(() => {
    //   return new fromRoot.Go({
    //     path: ['/portal/invoices/treatments']
    //   });
    // })
  );

  @Effect()
  getInvoiceRows$ = this.actions$.ofType(userActions.GET_INVOICE_ROWS).pipe(
    map((action: userActions.GetInvoiceRows) => action.payload),
    switchMap((request: SapakDataRequest) => {
      return this.invoicesService
        .getAllInvoiceRows(request)
        .pipe(
          switchMap(res => [new userActions.GetInvoiceRowsSuccess(res)]),
          catchError(error => of(new userActions.GetInvoiceRowsFail(error)))
        );
    })
  );

  @Effect()
  deleteInvoiceCompleted$ = this.actions$.ofType(userActions.DELETE_INVOICE_ROW_SUCCESS).pipe(
    map((action: userActions.DeleteInvoiceRowSuccess) => action.payload),
    map((request: DeleteInvoiceRowRequest) => {
      const newRequest = new SapakDataRequest();
      newRequest.invoice.invoiceNumField = request.invoiceNum;
      newRequest.invoice.billMonthField = request.billMonth;
      newRequest.userName = request.userName;
      newRequest.kodSapak = request.kodSapak;
      return newRequest;
    }),
    switchMap(val => [new userActions.GetInvoiceRows(val)])
  );
}
