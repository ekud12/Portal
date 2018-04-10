import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as userActions from '../actions';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '../../../../core/store';
import { InvoicesService } from '../../invoices.service';
import { SapakDataRequest } from '../../../user/models/sapak.model';

@Injectable()
export class InvoiceEffects {
  constructor(private actions$: Actions, private invoicesService: InvoicesService) {}

  @Effect()
  getInvoices$ = this.actions$.ofType(userActions.GET_INVOICES).pipe(
    map((action: userActions.GetInvoices) => action.payload),
    switchMap((allInvoicesRequest: SapakDataRequest) => {
      console.log(allInvoicesRequest);
      return this.invoicesService
        .getAllInvoicesForSapak(allInvoicesRequest)
        .pipe(
          switchMap(res => [new userActions.GetInvoicesSuccess(res)]),
          catchError(error => of(new userActions.GetInvoicesFail(error)))
        );
    })
  );
}
