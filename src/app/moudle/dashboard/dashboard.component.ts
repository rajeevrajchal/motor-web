import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  isSideBarOpen: boolean = false;

  constructor(private router: Router, private readonly auth: AuthService) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isSideBarOpen = false;
      });
  }

  handleOutsideClick(): void {
    this.isSideBarOpen = false;
  }

  toggleSideBar() {
    this.isSideBarOpen = !this.isSideBarOpen;
  }

  getSidebarClass() {
    return `h-full ${
      this.isSideBarOpen ? 'block w-full' : 'hidden'
    } md:w-[200px] md:block transition ease-in-out`;
  }

  getContentClass() {
    return this.isSideBarOpen ? 'hidden' : `flex-1 h-full px-4 py-2`;
  }
}
