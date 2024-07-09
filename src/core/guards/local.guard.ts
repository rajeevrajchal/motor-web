import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../app/moudle/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LocalGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.auth.authChanges((_, session) => {
      if (session && session.user) {
        this.router.navigate([this.router.url]);
        return false;
      } else {
        return true;
      }
    });
  }
}
