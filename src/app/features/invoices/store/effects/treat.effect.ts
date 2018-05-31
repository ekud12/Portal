import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ToastService } from '../../../../core/services/toast-service.service';
import * as fromRoot from '../../../../core/store';
import { SapakDataRequest } from '../../../user/models/sapak.model';
import { InvoicesService } from '../../invoices.service';
import { Invoice } from '../../models/class-models/objects.model';
import { DeleteInvoiceRowRequest, NewInvoiceRowRequest } from '../../models/requests-models/requests';
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
}
