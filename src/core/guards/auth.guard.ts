import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { includes } from 'lodash';
import { AuthService } from '../../app/moudle/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.auth.authChanges((_, session) => {
      if (session && session.user) {
        return true;
      } else {
        this.router.navigate(['/login'], {
          queryParams: !includes(['', '/', ' '], state.url)
            ? { returnUrl: state.url }
            : {},
        });
        return false;
      }
    });
  }
}
