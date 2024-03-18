// logged-in.guard.ts
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from './authentication.services';

@Injectable()
export class LoggedInGuard  {
  constructor(private user: AuthenticationService) {
  }

  canActivate() {
    return this.user.checkCredentials();
  }
}
