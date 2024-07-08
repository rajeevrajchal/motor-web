import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { includes } from 'lodash';
import { SupabaseService } from '../service/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private supabase: SupabaseService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.supabase.authChanges((_, session) => {
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
