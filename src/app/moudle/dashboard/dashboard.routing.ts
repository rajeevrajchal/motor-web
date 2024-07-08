import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'gas',
        loadChildren: () =>
          import('./pages/gas/gas.module').then((m) => m.GasModule),
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

export const DashboardRoutes = RouterModule.forChild(routes);
