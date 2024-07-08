import { Component } from '@angular/core';
import { SupabaseService } from '../../../../../core/service/supabase.service';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private readonly supabase: SupabaseService) {}
  logout() {
    this.supabase.logout();
  }
}
