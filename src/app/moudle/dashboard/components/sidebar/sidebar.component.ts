import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  isSidebarOpen: boolean = false;
  activeUrl: string = '';
  sidebars: any = [
    {
      href: '/',
      label: 'home',
      icon: `<i class="bi bi-house-door font-bold text-xl"></i>`,
    },
    {
      href: '/vehicle',
      label: 'vehicle',
      icon: `<i class="bi bi-truck-front font-bold text-xl"></i>`,
    },
    {
      href: '/gas',
      label: 'gas',
      icon: `<i class="bi bi-fuel-pump-fill font-bold text-xl"></i>`,
    },
    {
      href: '/services',
      label: 'service',
      icon: `<i class="bi bi-sliders font-bold text-xl"></i>`,
    },
  ];

  constructor(private readonly router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeUrl = event.url;
      });
  }

  isActive(url: string): boolean {
    if (this.activeUrl === url) {
      return true;
    }

    if (
      this.activeUrl.startsWith(url + '/') ||
      this.activeUrl.startsWith(url + '?') ||
      this.activeUrl === url + '/'
    ) {
      return true;
    }

    return false;
  }
}
