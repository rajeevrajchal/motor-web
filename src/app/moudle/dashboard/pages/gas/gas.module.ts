import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from '../../../../../chart/chart.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { GasRoutes } from './gas.routing';
import { GasCreateComponent } from './views/gas-create/gas-create.component';
import { InventoryComponent } from './views/inventory/inventory.component';

const component = [InventoryComponent, GasCreateComponent];

@NgModule({
  declarations: [...component],
  imports: [
    CommonModule,
    GasRoutes,
    SharedModule,
    ReactiveFormsModule,
    ChartModule,
  ],
})
export class GasModule {}
