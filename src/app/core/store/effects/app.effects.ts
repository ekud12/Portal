import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as appActions from '../actions';
import { BackendService } from '../../services/backend.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private backendService: BackendService
  ) {}
}
