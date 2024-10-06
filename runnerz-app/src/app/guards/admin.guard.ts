import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (_, __) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService
    .validateUserAuthentication()
    .then((isAuthenticated: boolean) => {
      if (!isAuthenticated) {
        return false;
      }

      const isAdmin: boolean = authService.hasAdminRole();
      isAdmin || router.navigate(['/runs']);
      return isAdmin;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
