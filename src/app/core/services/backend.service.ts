import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BackendService {
  constructor(private http: HttpClient) {}

  checkVersion(type) {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/1');
  }
}
