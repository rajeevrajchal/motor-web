import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../../../../core/service/toast.service';
import { VEHICLE } from '../../../../../../../model/vehicle.model';
import { GasService } from '../../gas.service';
import { VehicleService } from './../../../vehicle/vehicle.service';

@Component({
  selector: 'app-gas-create',
  templateUrl: './gas-create.component.html',
})
export class GasCreateComponent implements OnInit {
  isLoading: boolean = false;
  isDataDetailLoading: boolean = false;
  loginForm: any;
  vehicleLoading: any;
  vehicles: VEHICLE[] = [];
  gas_id: string | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly vehicleService: VehicleService,
    private readonly toast: ToastService,
    private readonly gasService: GasService,
    private readonly route: ActivatedRoute
  ) {}

  createGasForm = this.formBuilder.group({
    created_at: [''],
    quantity: ['', [Validators.required, Validators.min(1)]],
    cost: ['', [Validators.required, Validators.min(1)]],
    unit: ['', Validators.required],
    vehicle_id: [''],
  });

  ngOnInit(): void {
    this.getVehicle();
    this.gas_id = this.route.snapshot.paramMap.get('id');
    if (this.gas_id || this.gas_id !== null) {
      this.getGasDetail(this.gas_id);
    }
  }

  getVehicle() {
    this.vehicleLoading = true;
    this.vehicleService.getVehicle().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.vehicleLoading = false;
      },
      error: (error: any) => {
        this.toast.showError(error.message, 'Gas-Vehicle');
        this.vehicleLoading = false;
      },
    });
  }

  // gas detail
  getGasDetail(gas_id: string) {
    this.isDataDetailLoading = true;
    this.gasService.getGasDetail(gas_id).subscribe({
      next: (data) => {
        this.createGasForm.patchValue({
          created_at: data?.[0]?.created_at || '',
          quantity: data?.[0]?.quantity || '',
          cost: data?.[0]?.cost || '',
          unit: data?.[0]?.unit || '',
          vehicle_id: data?.[0]?.vehicle_id || '',
        });
        this.isDataDetailLoading = false;
      },
      error: (error) => {
        this.toast.showError(error.message, 'Gas');
        this.isDataDetailLoading = false;
      },
    });
  }

  // select vehicle
  selectVehicle(vehicle: string): void {
    this.createGasForm.patchValue({
      vehicle_id: vehicle,
    });
  }

  // button class for vehicle selected or not
  getButtonClass(vehicle: string): string {
    return this.createGasForm.value.vehicle_id === vehicle
      ? 'btn btn-primary'
      : 'btn btn-outline';
  }

  // on submit form value
  onSubmitGasForm() {
    if (this.createGasForm.valid) {
      this.isLoading = true;
      const values = this.createGasForm.value as any;
      if (this.gas_id) {
        this.gasService.updateGas(values, this.gas_id).subscribe({
          next: () => {
            this.router.navigateByUrl('/gas');
            this.toast.showSuccess('Record Updated', 'Gas');
            this.createGasForm.reset();
          },
          error: (error) => {
            this.toast.showError(error.message, 'Gas');
          },
        });
      } else {
        this.gasService.saveGas(values).subscribe({
          next: () => {
            this.router.navigateByUrl('/gas');
            this.toast.showSuccess('Record Created', 'Gas');
            this.createGasForm.reset();
          },
          error: (error) => {
            this.toast.showError(error.message, 'Gas');
          },
        });
      }
      this.isLoading = false;
    } else {
      this.createGasForm.markAllAsTouched();
    }
  }

  // on cancel
  onSubmitGasFormCancel() {
    this.createGasForm.reset();
    this.router.navigateByUrl('/gas');
  }
}
