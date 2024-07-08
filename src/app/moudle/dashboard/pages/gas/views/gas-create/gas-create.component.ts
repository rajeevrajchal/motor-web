import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gas-create',
  templateUrl: './gas-create.component.html',
})
export class GasCreateComponent {
  onLoginWithEmail() {
    throw new Error('Method not implemented.');
  }
  isLoading: boolean = false;
  loginForm: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

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
