import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() isSideBar: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  isLoading: boolean = false;
  constructor(private readonly auth: AuthService) {}

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout() {
    this.isLoading = true;
    this.auth.logout();
    this.isLoading = false;
  }
}
