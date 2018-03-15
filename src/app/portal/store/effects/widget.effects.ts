import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as widgetActions from '../actions';

@Injectable()
export class WidgetEffects {
  constructor(private actions$: Actions) {}
}
