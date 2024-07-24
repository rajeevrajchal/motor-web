import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../../shared/shared.module';
import { VehicleRoutes } from './vehicle.routing';
import { VehicleAddComponent } from './view/vehicle-add/vehicle-add.component';
import { VehicleDetailComponent } from './view/vehicle-detail/vehicle-detail.component';
import { VehicleListComponent } from './view/vehicle-list/vehicle-list.component';

const components = [
  VehicleListComponent,
  VehicleAddComponent,
  VehicleDetailComponent,
];
@NgModule({
  imports: [
    CommonModule,
    VehicleRoutes,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [...components],
})
export class VehicleModule {}
