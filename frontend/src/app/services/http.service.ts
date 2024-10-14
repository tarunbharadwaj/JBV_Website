import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  // Generic GET method
  get(url: string): Observable<any> {
    return this.http.get(url);
  }

  // Generic POST method
  post(url: string, data: any): Observable<any> {
    return this.http.post(url, data);
  }

  // Generic PUT method
  put(url: string, data: any): Observable<any> {
    return this.http.put(url, data);
  }

  // Generic DELETE method
  delete(url: string): Observable<any> {
    return this.http.delete(url);
  }
}
