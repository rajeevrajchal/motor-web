import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../../../../../core/service/toast.service';
import { VEHICLE } from '../../../../../../../model/vehicle.model';
import { VehicleService } from '../../vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
})
export class VehicleListComponent implements OnInit {
  vehicles: VEHICLE[] = [];
  isLoading: boolean = false;
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly toast: ToastService
  ) {}

  ngOnInit() {
    this.getAllVehicle();
  }

  async getAllVehicle() {
    this.isLoading = true;
    this.vehicleService
      .getVehicle()
      .then((data) => {
        this.vehicles = data;
      })
      .catch((error) => {
        this.toast.showError(error, 'Vehicle');
      });
    this.isLoading = false;
  }
}
