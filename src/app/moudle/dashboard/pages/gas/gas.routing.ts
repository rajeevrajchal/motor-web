import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GasCreateComponent } from './views/gas-create/gas-create.component';
import { InventoryComponent } from './views/inventory/inventory.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
  },
  {
    path: 'create',
    component: GasCreateComponent,
  },
  {
    path: ':id/edit',
    component: GasCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GasRoutes {}
