import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../../../core/service/toast.service';
import { VEHICLE } from '../../../../../../../model/vehicle.model';
import { VehicleService } from './../../../vehicle/vehicle.service';

@Component({
  selector: 'app-gas-create',
  templateUrl: './gas-create.component.html',
})
export class GasCreateComponent implements OnInit {
  isLoading: boolean = false;
  loginForm: any;
  vehicleLoading: any;
  vehicles: VEHICLE[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly vehicleService: VehicleService,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    this.getVehicle();
  }

  getVehicle() {
    this.vehicleLoading = true;
    this.vehicleService
      .getVehicle()
      .then((data) => {
        this.vehicles = data;
      })
      .catch((error) => {
        this.toast.showError(error, 'Vehicle');
      });
    this.vehicleLoading = false;
  }

  createGasForm = this.formBuilder.group({
    createdAt: [''],
    quantity: ['', [Validators.required, Validators.min(1)]],
    cost: ['', [Validators.required, Validators.min(1)]],
    unit: ['', Validators.required],
    vehicleId: ['Vehicle 2'],
  });

  selectVehicle(vehicle: string): void {
    this.createGasForm.patchValue({
      vehicleId: vehicle,
    });
  }

  getButtonClass(vehicle: string): string {
    return this.createGasForm.value.vehicleId === vehicle
      ? 'btn btn-primary'
      : 'btn btn-outline';
  }

  onSubmitGasForm() {
    if (this.createGasForm.valid) {
      this.isLoading = true;
      const values = this.createGasForm.value;
      this.isLoading = false;
    } else {
      console.log('errors', {
        error: this.createGasForm.controls,
      });
      this.createGasForm.markAllAsTouched();
    }
  }

  onSubmitGasFormCancel() {
    this.createGasForm.reset();
    this.router.navigateByUrl('/gas');
  }
}
