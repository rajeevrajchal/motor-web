import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SupabaseService } from '../../../../../core/service/supabase.service';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() isSideBar: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  isLoading: boolean = false;
  constructor(private readonly supabase: SupabaseService) {}

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  async logout() {
    this.isLoading = true;
    await this.supabase.logout();
    this.isLoading = false;
  }
}
