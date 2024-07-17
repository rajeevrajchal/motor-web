import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
})
export class BarChartComponent {
  @Input({
    required: true,
  })
  data: any = {};
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {
        min: 0,
        max: 15,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType = 'bar' as const;

  getChartData(): ChartData<'bar'> {
    console.log('chat data', this?.data?.data);
    return {
      labels: this?.data?.label,
      datasets: [
        {
          data: this?.data?.data?.[0].data || [],
          label: this?.data?.data?.[0].label,
        },
      ],
    };
  }
}
