import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as userActions from '../actions';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '@coreStore';
import { GridService } from 'app/portal/grid/grid.service';

@Injectable()
export class WidgetEffects {
  constructor(private actions$: Actions, private gridService: GridService) {}

  @Effect()
  initWidgets$ = this.actions$.ofType(userActions.INIT_WIDGETS).pipe(
    switchMap(() => {
      return this.gridService
        .getWidgets()
        .pipe(
          switchMap(res => [new userActions.InitWidgetsSuccess(res)]),
        );
    })
  );
}
