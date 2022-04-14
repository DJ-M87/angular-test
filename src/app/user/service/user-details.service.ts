import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndUser } from '../models/end-user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  url:string = environment.url;
  constructor(private http: HttpClient) { }

  addNewUser(user:EndUser): Observable<EndUser> {
    const userUrl:string = `${this.url}${environment.user}`;
    return this.http.post<EndUser>(userUrl, user);
  }
}
