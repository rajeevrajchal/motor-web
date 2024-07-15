import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import moment from 'moment';
import { VehicleService } from '../../../app/moudle/dashboard/pages/vehicle/vehicle.service';
import { DATE_FILTER } from '../../../constants/date_filter';
import { ToastService } from '../../../core/service/toast.service';
import { VEHICLE } from '../../../model/vehicle.model';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: [],
})
export class TableHeaderComponent implements OnInit {
  vehicle: string | null = null;
  vehicleLoading: boolean = false;
  vehicles: VEHICLE[] = [];
  date_filter: DATE_FILTER = 'this_week';
  date_filter_from: string = moment().format('YYYY-MM-DD');
  date_filter_to: string = moment().endOf('week').format('YYYY-MM-DD');

  @Input() hideActionButton: boolean = false;
  @Input() actionButton: {
    link: string;
    label: string;
  } = {
    link: '',
    label: '',
  };
  @Input({
    required: true,
  })
  title: string = 'Gas Inventory';
  @Output()
  filterChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private readonly toast: ToastService,
    private readonly vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.getVehicle();
  }

  private emitFilterChange() {
    this.filterChange.emit({
      date_filter: this.date_filter,
      date_filter_from: this.date_filter_from,
      date_filter_to: this.date_filter_to,
      vehicle: this.vehicle,
    });
  }

  getVehicle() {
    this.vehicleLoading = true;
    this.vehicleService.getVehicle().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.vehicle = data[0]?.id;
        this.vehicleLoading = false;
        this.emitFilterChange();
      },
      error: (error: any) => {
        this.toast.showError(error.message, 'Gas-Vehicle');
        this.vehicleLoading = false;
      },
    });
  }

  onVehicleChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedVehicleId = selectElement.value;
    this.vehicle = selectedVehicleId;
    this.emitFilterChange();
  }

  dateFilterChange(event: {
    date_filter: DATE_FILTER;
    date_filter_from: string;
    date_filter_to: string;
  }) {
    this.date_filter = event.date_filter;
    this.date_filter_from = event.date_filter_from;
    this.date_filter_to = event.date_filter_to;
    this.emitFilterChange();
  }
}
