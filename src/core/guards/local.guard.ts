import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SupabaseService } from '../service/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class LocalGuard implements CanActivate {
  constructor(private router: Router, private supabase: SupabaseService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.supabase.authChanges((_, session) => {
      if (session && session.user) {
        this.router.navigate([this.router.url]);
        return false;
      } else {
        return true;
      }
    });
  }
}
