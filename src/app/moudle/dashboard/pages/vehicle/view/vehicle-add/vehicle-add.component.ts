import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VEHICLE_INPUT } from '../../vehicle.service';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
})
export class VehicleAddComponent {
  isLoading: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
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
      console.log('values', values);
      this.isLoading = false;
      // this.router.navigate(['/vehicle']);
    } else {
      this.createVehicleForm.markAllAsTouched();
    }
  }
}
