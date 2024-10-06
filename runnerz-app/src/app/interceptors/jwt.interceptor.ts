import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const jWTInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = inject(AuthService).getCurrentUser()?.jwt;

  if (jwt) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt.toString()}`,
      },
    });
    return next(clonedReq);
  }
  return next(req);
};
