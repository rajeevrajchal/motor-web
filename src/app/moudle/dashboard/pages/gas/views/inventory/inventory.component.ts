import { Component } from '@angular/core';
import moment from 'moment';
import { DATE_FILTER } from '../../../../../../../constants/date_filter';
import { ToastService } from '../../../../../../../core/service/toast.service';
import { VEHICLE } from '../../../../../../../model/vehicle.model';
import { GasService } from '../../gas.service';
import { GAS } from './../../../../../../../model/gas.model';

const format = 'MMMM, DD YYYY';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
})
export class InventoryComponent {
  date: Date = new Date();
  vehicle: string | null = null;
  isLoading: boolean = false;
  deletingRecordId: string | null = null;
  gas_inventory: GAS[] = [];
  vehicles: VEHICLE[] = [];
  date_filter: DATE_FILTER = 'this_month';
  date_filter_from: string = moment().startOf('month').format('YYYY-MM-DD');
  date_filter_to: string = moment().endOf('month').format('YYYY-MM-DD');
  actionButton = {
    label: 'Add Gas',
    link: 'create',
  };
  chart_data: any = {};

  constructor(
    private readonly gasService: GasService,
    private readonly toast: ToastService
  ) {}

  getAllByVehicle(event: {
    vehicle: string;
    date_filter_from: string;
    date_filter_to: string;
  }) {
    this.isLoading = true;
    this.gasService.getAllGasByVehicle(event).subscribe({
      next: (data) => {
        this.gas_inventory = data.sort(
          (a: GAS, b: GAS) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        const chart = data
          .sort(
            (a: GAS, b: GAS) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
          )
          .reduce(
            (
              acc: {
                label: string[];
                data: { data: number[]; label: string }[];
              },
              current: GAS
            ) => {
              acc.label.push(
                moment(current.created_at).format('MMM, DD, YYYY')
              );
              acc.data[0].data.push(current.quantity as any);
              return acc;
            },
            {
              label: [],
              data: [{ data: [], label: 'Quantity' }],
            }
          );
        this.chart_data = chart;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.toast.showError(error.message, 'Gas');
        this.isLoading = false;
      },
    });
  }

  getTotalCost() {
    return this.gas_inventory.reduce(
      (acc: any, curr: any) => acc + curr.cost,
      0
    );
  }

  getEditLink(id: number): string {
    return `${id}/edit`;
  }

  deleteGasRecord(id: string) {
    this.deletingRecordId = id;
    this.gasService.deleteRecord(id).subscribe({
      next: (data) => {
        this.gas_inventory = data;
        this.deletingRecordId = null;
      },
      error: (error: any) => {
        this.toast.showError(error.message, 'Gas');
        this.deletingRecordId = id;
      },
    });
  }

  onFilterChange(event: {
    date_filter: DATE_FILTER;
    date_filter_from: string;
    date_filter_to: string;
    vehicle: string;
  }) {
    this.date_filter = event.date_filter;
    this.date_filter_from = event.date_filter_from;
    this.date_filter_to = event.date_filter_to;
    this.vehicle = event.vehicle;

    this.getAllByVehicle({
      vehicle: this.vehicle || '',
      date_filter_from: event.date_filter_from,
      date_filter_to: event.date_filter_to,
    });
  }
}
