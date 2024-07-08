import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ButtonComponent } from './components/button/button.component';

const components = [ButtonComponent, BreadcrumbComponent];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [...components],
  exports: [...components],
})
export class SharedModule {}
