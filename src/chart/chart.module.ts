import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { BarChartComponent } from './bar-chart/bar-chart.component';

const components = [BarChartComponent];
@NgModule({
  imports: [CommonModule, BaseChartDirective],
  declarations: [...components],
  exports: [...components],
})
export class ChartModule {}
