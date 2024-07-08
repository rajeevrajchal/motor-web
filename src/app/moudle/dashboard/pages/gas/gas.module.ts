import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GasRoutes } from './gas.routing';
import { InventoryComponent } from './views/inventory/inventory.component';

const component = [InventoryComponent];

@NgModule({
  imports: [CommonModule, GasRoutes],
  declarations: [...component],
})
export class GasModule {}
