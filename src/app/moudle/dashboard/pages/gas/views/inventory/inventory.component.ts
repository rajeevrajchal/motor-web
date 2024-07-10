import { Component, OnInit } from '@angular/core';
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
        console.log('the data', data);
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

  getTotalCost() {
    return this.gas_inventory.reduce(
      (acc: any, curr: any) => acc + curr.cost,
      0
    );
  }

  getEditLink(id: number): string {
    return `${id}/edit`;
  }
}
