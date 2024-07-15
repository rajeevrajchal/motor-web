import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import {
  DATE_FILTER,
  DATE_FILTER_VALUE,
  date_filter_values,
} from '../../../../../../../constants/date_filter';
import { ToastService } from '../../../../../../../core/service/toast.service';
import { GAS } from '../../../../../../../model/gas.model';
import { VEHICLE } from '../../../../../../../model/vehicle.model';
import { VehicleService } from '../../../vehicle/vehicle.service';
import { GasService } from '../../gas.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit {
  date: Date = new Date();
  vehicle: string | null = null;
  isLoading: boolean = false;
  deletingRecordId: string | null = null;
  vehicleLoading: any;
  gas_inventory: GAS[] = [];
  vehicles: VEHICLE[] = [];
  date_filter: DATE_FILTER = 'this_week';
  date_filter_const = date_filter_values;
  date_filter_from: string = moment().format('YYYY-MM-DD');
  date_filter_to: string = moment().endOf('week').format('YYYY-MM-DD');

  constructor(
    private readonly gasService: GasService,
    private readonly toast: ToastService,
    private readonly vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.getVehicle();
  }

  getVehicle() {
    this.vehicleLoading = true;
    this.vehicleService.getVehicle().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.vehicle = data[0]?.id;
        this.getAllByVehicle(data[0]?.id);
        this.vehicleLoading = false;
      },
      error: (error: any) => {
        this.toast.showError(error.message, 'Gas-Vehicle');
        this.vehicleLoading = false;
      },
    });
  }

  getAllByVehicle(vehicle: string) {
    this.isLoading = true;
    this.gasService.getAllGasByVehicle(vehicle).subscribe({
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

  onVehicleChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedVehicleId = selectElement.value;
    this.vehicle = selectedVehicleId;
    this.getAllByVehicle(selectedVehicleId);
  }

  onChangeDatePicker(filter: DATE_FILTER) {
    this.date_filter = filter;
    let startDate: any = '';
    let endDate: any = '';

    switch (this.date_filter) {
      case 'this_week':
        startDate = moment().startOf('isoWeek');
        endDate = moment().endOf('isoWeek');
        break;
      case 'last_week':
        startDate = moment().subtract(1, 'weeks').startOf('isoWeek');
        endDate = moment().subtract(1, 'weeks').endOf('isoWeek');
        break;
      case 'this_month':
        startDate = moment().startOf('month');
        endDate = moment().endOf('month');
        break;
      case 'last_month':
        startDate = moment().subtract(1, 'months').startOf('month');
        endDate = moment().subtract(1, 'months').endOf('month');
        break;
      case 'this_year':
        startDate = moment().startOf('year');
        endDate = moment().endOf('year');
        break;
      case 'last_year':
        startDate = moment().subtract(1, 'years').startOf('year');
        endDate = moment().subtract(1, 'years').endOf('year');
        break;
      default:
        break;
    }
    this.date_filter_from = startDate.format('YYYY-MM-DD');
    this.date_filter_to = endDate.format('YYYY-MM-DD');
  }

  onChangeDateFilterValue = (key: 'from' | 'to', event: Event) => {
    const selectElement = event.target as HTMLInputElement;
    this.date_filter = 'custom';
    if (key === 'from') {
      this.date_filter_from = selectElement.value;
    }
    if (key === 'to') {
      this.date_filter_to = selectElement.value;
    }
  };

  getTotalCost() {
    return this.gas_inventory.reduce(
      (acc: any, curr: any) => acc + curr.cost,
      0
    );
  }

  getEditLink(id: number): string {
    return `${id}/edit`;
  }

  getLabelForDateFilter() {
    if (this.date_filter === 'custom') {
      return `${moment(this.date_filter_from).format(
        'MMMM, DD YYYY'
      )} - ${moment(this.date_filter_to).format('MMMM, DD YYYY')}`;
    }
    return DATE_FILTER_VALUE[this.date_filter];
  }

  getTitleForDateFilter() {
    return `${moment(this.date_filter_from).format('MMMM, DD YYYY')} - ${moment(
      this.date_filter_to
    ).format('MMMM, DD YYYY')}`;
  }

  getDateFilterClass(value: DATE_FILTER) {
    const active = this.date_filter === value;
    return `btn btn-sm flex items-start font-normal capitalize ${
      active ? 'btn-primary' : 'btn-ghost'
    }`;
  }
}
