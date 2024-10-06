import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../models/auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.SERVER_URL}/runnerz/api/user`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, user);
  }
}
