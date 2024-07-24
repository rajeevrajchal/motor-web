import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../../../core/service/toast.service';
import { VEHICLE_INPUT, VehicleService } from '../../vehicle.service';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
})
export class VehicleAddComponent {
  isLoading: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly vehicleService: VehicleService,
    private readonly toast: ToastService
  ) {}

  createVehicleForm = this.formBuilder.group({
    name: ['', Validators.required],
    identity: ['', Validators.required],
    fuel: ['', Validators.required],
  });

  async onSubmitVehicle() {
    if (this.createVehicleForm.valid) {
      this.isLoading = true;
      const values = {
        ...this.createVehicleForm.value,
      } as VEHICLE_INPUT;
      this.vehicleService.saveVehicle(values).subscribe({
        next: () => {
          this.router.navigate(['/vehicle']);
          this.toast.showSuccess('Record Updated', 'Vehicle');
          this.createVehicleForm.reset();
        },
        error: (error) => {
          this.toast.showError(error.message, 'Gas');
        },
      });
      this.isLoading = false;
    } else {
      this.createVehicleForm.markAllAsTouched();
    }
  }

  onSubmitVehicleFormCancel() {
    this.createVehicleForm.reset();
    this.router.navigateByUrl('/vehicle');
  }
}
