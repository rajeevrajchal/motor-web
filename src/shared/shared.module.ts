import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ButtonComponent } from './components/button/button.component';
import { LoadingViewComponent } from './components/loading-view/loading-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ClickOutsideDirective } from './directive/click-outside.directive';
import { FormatCurrencyPipe } from './pipes/format-currency.pipe';

const components = [
  ButtonComponent,
  BreadcrumbComponent,
  ClickOutsideDirective,
  FormatCurrencyPipe,
  LoadingComponent,
  LoadingViewComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [...components],
  exports: [...components],
})
export class SharedModule {}
