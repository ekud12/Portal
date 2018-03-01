import { Injectable } from '@angular/core';
import { LoginModel } from './models/login.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { User } from './models/user.model';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  login(loginDetails: LoginModel): Observable<any> {
    return (
      this.http
        // .get('http://www.mocky.io/v2/5a9808493000003c325c2012')
        .get('http://www.mocky.io/v2/5a980b073000005a005c2022')
        .pipe(
          map(result => result),
          catchError((error: any) => Observable.throw(error))
        )
    );
  }
}
