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
import { httpRoutes } from '@http-routes';
/**
 *  Error Interceptor
 *  Returns any request but if error caught
 *  pass it to the handler
 */
@Injectable()
export class ErrorHandler implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(e => this.handleError(e)));
  }

  /**
   * handle Errors Returned from HTTP calls
   * depends on the type of error it
   * extracting the error occurs inside effects
   * @returns Error Message as ErrorObservable
   */
  handleError(error): ErrorObservable {
    let errorMessage = '';
    if (error instanceof HttpErrorResponse) {
      if (error.url.endsWith(httpRoutes.LOGIN)) {
        errorMessage = error.error.error_description;
      }
      errorMessage = error.message;
    }
    return new ErrorObservable(error);
  }
}
