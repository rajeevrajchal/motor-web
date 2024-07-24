import { RouterModule, Routes } from '@angular/router';
import { VehicleAddComponent } from './view/vehicle-add/vehicle-add.component';
import { VehicleDetailComponent } from './view/vehicle-detail/vehicle-detail.component';
import { VehicleListComponent } from './view/vehicle-list/vehicle-list.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleListComponent,
  },
  {
    path: 'add',
    component: VehicleAddComponent,
  },
  {
    path: ':vehicle_id',
    component: VehicleDetailComponent,
  },
];

export const VehicleRoutes = RouterModule.forChild(routes);
