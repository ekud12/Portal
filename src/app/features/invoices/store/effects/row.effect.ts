import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ToastService } from '../../../../core/services/toast-service.service';
import * as fromRoot from '../../../../core/store';
import { SapakDataRequest } from '../../../user/models/sapak.model';
import { InvoicesService } from '../../invoices.service';
import { Invoice } from '../../models/class-models/objects.model';
import { DeleteInvoiceRowRequest, NewInvoiceRowRequest, UpdateInvoiceRowRequest } from '../../models/requests-models/requests';
import * as userActions from '../actions';

@Injectable()
export class RowEffects {
  constructor(private actions$: Actions, private invoicesService: InvoicesService, private toaster: ToastService) {}

  @Effect({ dispatch: false })
  activateInvoiceRow$ = this.actions$.ofType(userActions.ACTIVATE_INVOICE_ROW).pipe(
    map((action: userActions.ActivateInvoiceRow) => action.payload),
    tap(val => {
      this.toaster.openSnackBar(`שורה מס' ${val.lineNumField} נבחרה כפעילה.`, null);
    })
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
  createInvoiceRowSuccess$ = this.actions$.ofType(userActions.CREATE_INVOICE_ROW_SUCCESS).pipe(
    tap(val => {
      this.toaster.openSnackBar(`שורה נוספה בהצלחה!`, null);
    }),
    map(() => {
      return new fromRoot.Go({
        path: ['/portal/invoices/rows']
      });
    })
  );

  @Effect()
  deleteInvoiceRow$ = this.actions$.ofType(userActions.DELETE_INVOICE_ROW).pipe(
    map((action: userActions.DeleteInvoiceRow) => action.payload),
    switchMap((request: DeleteInvoiceRowRequest) => {
      return this.invoicesService
        .deleteInvoiceRow(request)
        .pipe(
          switchMap(res => [new userActions.DeleteInvoiceRowSuccess(request)]),
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
  updateInvoiceRow$ = this.actions$.ofType(userActions.UPDATE_INVOICE_ROW).pipe(
    map((action: userActions.UpdateInvoiceRow) => action.payload),
    switchMap((request: UpdateInvoiceRowRequest) => {
      return this.invoicesService
        .updateInvoiceRow(request)
        .pipe(
          switchMap(res => [new userActions.UpdateInvoiceRowSuccess(request)]),
          catchError(error => of(new userActions.UpdateInvoiceRowFail(error)))
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
  deleteInvoiceCompleted$ = this.actions$
    /** IN CASE its last row it returns an error, needs fixing on as400 part to indicate the case as success
     */
    .ofType(userActions.DELETE_INVOICE_ROW_SUCCESS)
    .pipe(
      map((action: userActions.DeleteInvoiceRowSuccess) => action.payload),
      map((request: DeleteInvoiceRowRequest) => {
        const newRequest = new SapakDataRequest();
        newRequest.invoice = new Invoice();
        newRequest.invoice.invoiceNumField = request.invoiceNum;
        newRequest.invoice.billMonthField = request.billMonth;
        newRequest.userName = request.userName;
        newRequest.kodSapak = request.kodSapak;
        return newRequest;
      }),
      tap(val => {
        this.toaster.openSnackBar(`שורה נמחקה בהצלחה!`, null);
      }),
      switchMap(val => [new userActions.GetInvoiceRows(val)])
    );

  @Effect()
  resetInvoiceRows$ = this.actions$
    .ofType(userActions.ACTIVATE_INVOICE)
    .pipe(switchMap(val => [new userActions.ResetInvoiceRows()]));
}
