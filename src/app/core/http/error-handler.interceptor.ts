import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class ErrorHandler implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(e => this.handleError(e)));
  }

  handleError(error): ErrorObservable {
    let errorMessage = '';
    if (error instanceof HttpErrorResponse) {
      console.error(`${error.name} ::  ${error.error} | ${error.message}`);
      errorMessage = error.message;
    }
    return new ErrorObservable(errorMessage);
  }
}
