import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

enum httpMethods {
  GET = 1,
  POST = 2,
  PUT = 3,
  DELETE = 4
}

@Injectable()
export class BackendService {
  baseUrl: string;
  tokenBaseUrl: string;
  constructor(
    private http: HttpClient
  ) {}

  checkVersion(type) {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/1');
  }
}
