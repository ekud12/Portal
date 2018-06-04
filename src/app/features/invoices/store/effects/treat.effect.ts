import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ToastService } from '../../../../core/services/toast-service.service';
import * as fromRoot from '../../../../core/store';
import { SapakDataRequest } from '../../../user/models/sapak.model';
import { InvoicesService } from '../../invoices.service';
import { DeleteTreatmentForRowRequest, NewTreatmentForRowRequest } from '../../models/requests-models/requests';
import * as userActions from '../actions';

@Injectable()
export class TreatmentsEffects {
  constructor(private actions$: Actions, private invoicesService: InvoicesService, private toaster: ToastService) {}

  @Effect()
  getTreatmentsForInvoiceRow$ = this.actions$.ofType(userActions.GET_TREATMENTS_FOR_ROW).pipe(
    map((action: userActions.GetTreatmentsForRow) => action.payload),
    switchMap((request: SapakDataRequest) => {
      return this.invoicesService
        .getAllTreatmentsForInvoiceRow(request)
        .pipe(
          switchMap(res => [new userActions.GetTreatmentsForRowSuccess(res)]),
          catchError(error => of(new userActions.GetTreatmentsForRowFail(error)))
        );
    })
  );

  @Effect()
  createNewTreatmentForRow$ = this.actions$.ofType(userActions.CREATE_TREATMENT_FOR_ROW).pipe(
    map((action: userActions.CreateNewTreatmentForInvoiceRow) => action.payload),
    switchMap((request: NewTreatmentForRowRequest) => {
      return this.invoicesService
        .createTreatmentForRow(request)
        .pipe(
          switchMap(res => [new userActions.CreateNewTreatmentForInvoiceRowSuccess(res)]),
          catchError(error => of(new userActions.CreateNewTreatmentForInvoiceRowFail(error)))
        );
    })
  );

  @Effect()
  createNewTreatmentForRowSuccess$ = this.actions$.ofType(userActions.CREATE_TREATMENT_FOR_ROW_SUCCESS).pipe(
    tap(val => {
      this.toaster.openSnackBar(`טיפול נוסף בהצלחה.`, null);
    }),
    map(() => {
      return new fromRoot.Go({
        path: ['/portal/invoices/treatments']
      });
    })
  );

  @Effect()
  deleteTreatmentForRow$ = this.actions$.ofType(userActions.DELETE_TREATMENT_FOR_ROW).pipe(
    map((action: userActions.DeleteTreatmentForInvoiceRow) => action.payload),
    switchMap((request: DeleteTreatmentForRowRequest) => {
      return this.invoicesService
        .deleteTreatmentForRow(request)
        .pipe(
          switchMap(res => [new userActions.DeleteTreatmentForInvoiceRowSuccess(request)]),
          catchError(error => of(new userActions.DeleteTreatmentForInvoiceRowFail(error)))
        );
    })
  );
  @Effect()
  deleteTreatmentForRowSuccess$ = this.actions$.ofType(userActions.DELETE_TREATMENT_FOR_ROW_SUCCESS).pipe(
    map((action: userActions.DeleteTreatmentForInvoiceRowSuccess) => action.payload),
    // map((request: DeleteInvoiceRowRequest) => {
    //   const newRequest = new SapakDataRequest();
    //   newRequest.invoice = new Invoice();
    //   newRequest.invoice.invoiceNumField = request.invoiceNum;
    //   newRequest.invoice.billMonthField = request.billMonth;
    //   newRequest.userName = request.userName;
    //   newRequest.kodSapak = request.kodSapak;
    //   return newRequest;
    // }),
    tap(val => {
      this.toaster.openSnackBar(`טיפול נמחק בהצלחה`, null);
    })
    // switchMap(val => [new userActions.GetInvoiceRows(val)])
  );

  // @Effect()
  // resetTreatmentsForRow$ = this.actions$
  //   .ofType(userActions.ACTIVATE_INVOICE)
  //   .pipe(switchMap(val => [new userActions.ResetInvoiceRows()]));
}
