import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../models/auth/user.model';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.SERVER_URL}/runnerz/api/user`;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, user);
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }

  public validateUserForm(userForm: FormGroup): boolean {
    if (userForm.invalid) {
      if (userForm.get('username')?.errors?.['required']) {
        this.toastr.error('Please provide a username.', 'Error');
        return false;
      }

      const passwordControl = userForm.get('password');
      if (passwordControl?.errors?.['required']) {
        this.toastr.error('Please provide a password.', 'Error');
        return false;
      }

      if (passwordControl?.errors?.['minlength']) {
        this.toastr.error(
          `Password must be at least ${passwordControl.errors['minlength'].requiredLength} characters long.`,
          'Error'
        );
        return false;
      }

      if (userForm.get('roles')?.value.length === 0) {
        this.toastr.error('Select at least one role for the new User.');
        return false;
      }

      this.toastr.error('Form is invalid.', 'Error');
      return false;
    }

    return true;
  }
}
