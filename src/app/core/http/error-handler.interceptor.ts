import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpRoutes } from '@http-routes';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

/**
 *  Error Interceptor
 *  Returns any request but if error caught
 *  pass it to the handler
 */
@Injectable()
export class ErrorHandler implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
    // console.log(error););

    if (error instanceof HttpErrorResponse) {
      if (error.url.endsWith(httpRoutes.LOGIN)) {
        errorMessage = error.error.error_description;
      } else if (error.url.endsWith(httpRoutes.ZAKAUT_API)) {
        errorMessage = error.error.errors === null ? error.error.message : error.error.errors;
      } else if (error.url.endsWith(httpRoutes.TREATMENTS_API)) {
        errorMessage = error.error.errors === null ? error.error.message : error.error.errors;
      } else if (error.url.endsWith(httpRoutes.INVOICES_API)) {
        errorMessage = error.error.errors === null ? error.error.message : error.error.errors;
      } else {
        errorMessage = error.error;
      }
    }
    return new ErrorObservable(errorMessage);
  }
}
