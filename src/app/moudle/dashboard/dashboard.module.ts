import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';

const component = [DashboardComponent, NavbarComponent];
@NgModule({
  imports: [CommonModule, SharedModule, DashboardRoutes],
  declarations: [...component],
})
export class DashboardModule {}
