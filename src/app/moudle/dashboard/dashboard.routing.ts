import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
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
        path: 'vehicle',
        loadChildren: () =>
          import('./pages/vehicle/vehicle.module').then((m) => m.VehicleModule),
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

export const DashboardRoutes = RouterModule.forChild(routes);
