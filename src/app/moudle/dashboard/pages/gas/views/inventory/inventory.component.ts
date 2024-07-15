import { Component } from '@angular/core';
import moment from 'moment';
import { DATE_FILTER } from '../../../../../../../constants/date_filter';
import { ToastService } from '../../../../../../../core/service/toast.service';
import { GAS } from '../../../../../../../model/gas.model';
import { VEHICLE } from '../../../../../../../model/vehicle.model';
import { GasService } from '../../gas.service';

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
  date_filter: DATE_FILTER = 'this_week';
  date_filter_from: string = moment().format(format);
  date_filter_to: string = moment().endOf('week').format(format);
  actionButton = {
    label: 'Add Gas',
    link: 'create',
  };

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
        this.gas_inventory = data;
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
