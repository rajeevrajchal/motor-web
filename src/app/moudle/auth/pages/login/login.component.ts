import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../../../../core/service/toast.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  title: string = 'MotorFit';
  isLoading: boolean = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly toastService: ToastService,
    private readonly auth: AuthService
  ) {}

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onLoginWithEmail() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.auth
        .loginWithEmail(this.loginForm.value.email as string)
        .then(() => {
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.log('the error', error);
          this.toastService.showError(error || 'Login Failed', 'Login');
        })
        .finally(() => {
          this.toastService.showError('Login Failed', 'Login');
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
