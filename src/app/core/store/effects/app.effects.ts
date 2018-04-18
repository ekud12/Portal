import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

import { BackendService } from '../../services/backend.service';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private backendService: BackendService) {}
}
