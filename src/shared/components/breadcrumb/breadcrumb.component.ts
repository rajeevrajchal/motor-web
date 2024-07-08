import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { includes } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface Breadcrumb {
  path: string;
  label: string;
  is_active: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  readonly breadcrumbs$ = this.breadcrumbs.asObservable();

  constructor(private readonly router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateBreadcrumbs(event.urlAfterRedirects);
      });
  }

  private updateBreadcrumbs(url: string) {
    // Remove query parameters
    const urlWithoutQueryParams = url.split('?')[0];

    const breadcrumbList: Breadcrumb[] = [
      {
        path: '/',
        label: 'Home',
        is_active: urlWithoutQueryParams === '/',
      },
    ];

    let currentPath = '';

    urlWithoutQueryParams.split('/').forEach((segment, index) => {
      if (segment) {
        currentPath += `/${segment}`;
        breadcrumbList.push({
          path: currentPath,
          label: this.getLabel(segment),
          is_active: index === urlWithoutQueryParams.split('/').length - 1,
        });
      }
    });

    if (breadcrumbList.length === 0) {
      breadcrumbList.push({
        path: '/',
        label: 'Home',
        is_active: true,
      });
    }

    this.breadcrumbs.next(breadcrumbList);
  }

  private getLabel(segment: string): string {
    if (includes(['', '/'], segment)) {
      return 'Home';
    } else if (!isNaN(Number(segment))) {
      return segment;
    } else {
      return segment;
    }
  }
}
