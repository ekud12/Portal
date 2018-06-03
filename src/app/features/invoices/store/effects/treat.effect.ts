import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ToastService } from '../../../../core/services/toast-service.service';
import * as fromRoot from '../../../../core/store';
import { SapakDataRequest } from '../../../user/models/sapak.model';
import { InvoicesService } from '../../invoices.service';
import { NewTreatmentForRowRequest } from '../../models/requests-models/requests';
import * as userActions from '../actions';

@Injectable()
export class TreatmentsEffects {
  constructor(private actions$: Actions, private invoicesService: InvoicesService, private toaster: ToastService) {}

  @Effect({ dispatch: false })
  activateTreatment$ = this.actions$.ofType(userActions.ACTIVATE_TREATMENT).pipe(
    map((action: userActions.ActivateTreatment) => action.payload)
    // tap(val => {
    //   this.toaster.openSnackBar(`טיפ מס' ${val.lineNumField} נבחרה כפעילה.`, null);
    // })
  );

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

  // @Effect()
  // resetTreatmentsForRow$ = this.actions$
  //   .ofType(userActions.ACTIVATE_INVOICE)
  //   .pipe(switchMap(val => [new userActions.ResetInvoiceRows()]));
}
