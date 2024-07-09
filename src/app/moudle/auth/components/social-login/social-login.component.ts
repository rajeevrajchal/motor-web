import { Component } from '@angular/core';
import { ToastService } from '../../../../../core/service/toast.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'auth-social-login',
  templateUrl: './social-login.component.html',
})
export class SocialLoginComponent {
  isLoading: boolean = false;
  constructor(
    private readonly auth: AuthService,
    private readonly toast: ToastService
  ) {}

  async googleLogin() {
    this.isLoading = true;
    const { error } = await this.auth.loginWithGoogle();
    this.isLoading = false;
    if (error) {
      this.toast.showError(error?.message || 'Login Failed', 'login');
    }
  }
}
