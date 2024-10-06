import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthRequest } from '../models/auth/authRequest.model';
import { User } from '../models/auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private ADMIN = 'ADMIN';
  private LOGIN = '/login';
  private RUN_DASHBOARD = '/runs';
  private USER_DASHBOARD = '/users';
  private JWT = 'jwt';
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelperService: JwtHelperService
  ) {}

  public authenticate(authRequest: AuthRequest): Observable<any> {
    return this.http
      .post(
        `${environment.SERVER_URL}/runnerz/api/auth/authenticate`,
        authRequest
      )
      .pipe(map((data) => data));
  }

  public getCurrentUser(): User | null {
    return this.currentUser.getValue();
  }

  public setCurrentUserFromLocalStorage(): void {
    this.currentUser.next(this.getUserFromJWT());
  }

  public saveUser(jwt: string): void {
    localStorage.setItem(this.JWT, JSON.stringify(jwt));
    this.setCurrentUserFromLocalStorage();
    console.log(this.currentUser.getValue());
  }

  public hasAdminRole(): boolean {
    let hasAdminRole = false;

    this.currentUser.getValue()?.roles.forEach((role) => {
      if (role && role?.name === this.ADMIN) {
        hasAdminRole = true;
      }
    });

    return hasAdminRole;
  }

  public logout(message?: string): void {
    let navigationExtras;

    if (message) {
      navigationExtras = {
        state: {
          message: message,
        },
      };
    }

    this.currentUser.getValue()?.username &&
      console.log(
        `Logging out user '${this.currentUser.getValue()?.username}'`
      );
    navigationExtras
      ? this.router.navigate([this.LOGIN], navigationExtras)
      : this.router.navigate([this.LOGIN]);
    localStorage.removeItem(this.JWT);
    this.currentUser.next(null);
  }

  public validateUserAuthentication(): Promise<boolean> {
    return new Promise<boolean>((resolve, _) => {
      const user: User | null = this.currentUser.getValue();

      if (!user?.jwt || !user?.username) {
        this.logout('Please login to access the application.');
        resolve(false);
        return;
      }

      if (this.jwtHelperService.isTokenExpired(user.jwt)) {
        this.logout('Your session may have expired. Please login again.');
        resolve(false);
      }

      resolve(true);
    });
  }

  public isUserNotAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve, _) => {
      const user: User | null = this.currentUser.getValue();

      if (!user?.jwt || !user?.username) {
        resolve(true);
        return;
      }

      if (!this.jwtHelperService.isTokenExpired(user.jwt)) {
        this.hasAdminRole()
          ? this.router.navigate([this.USER_DASHBOARD])
          : this.router.navigate([this.RUN_DASHBOARD]);
        resolve(false);
      }

      resolve(true);
    });
  }

  private getUserFromJWT(): User | null {
    const jwtData = localStorage.getItem(this.JWT);
    if (!jwtData) {
      return null;
    }

    const jwt: string = JSON.parse(jwtData);
    let payload;

    try {
      payload = this.jwtHelperService.decodeToken(jwt);
    } catch (err) {
      console.error(
        'Failed to parse JWT payload. Content may be altered.',
        err
      );
      return null;
    }

    return {
      jwt,
      username: payload.sub,
      roles: payload.roles,
    };
  }
}
