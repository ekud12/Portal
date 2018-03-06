import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { catchError, map } from 'rxjs/operators';
import { BackendService } from '../../core/services/backend.service';

import { httpRoutes } from '@http-routes';
import { ZakautQueryModel } from './models/zakaut-query.model';

@Injectable()
export class ZakautService {
  constructor(private backendService: BackendService) {}

  checkZakaut(request: ZakautQueryModel): Observable<any> {
    return this.backendService.post<ZakautQueryModel>(
      httpRoutes.ZAKAUT_API,
      request
    );
  }
}
