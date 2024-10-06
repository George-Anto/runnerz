import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (_, __) => {
  return inject(AuthService).isUserNotAuthenticated();
};
