import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EndUser } from '../models/end-user';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  url:string = 'http://fake-url.test'
  constructor(private http: HttpClient) { }

  addNewUser(user:EndUser): Observable<EndUser> {
    return this.http.post<EndUser>(`${this.url}/user`, user)
  }
}
