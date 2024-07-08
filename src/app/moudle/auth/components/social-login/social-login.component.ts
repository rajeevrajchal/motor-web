import { Component } from '@angular/core';
import { SupabaseService } from '../../../../../core/service/supabase.service';
import { ToastService } from '../../../../../core/service/toast.service';

@Component({
  selector: 'auth-social-login',
  templateUrl: './social-login.component.html',
})
export class SocialLoginComponent {
  isLoading: boolean = false;
  constructor(
    private readonly supabase: SupabaseService,
    private readonly toast: ToastService
  ) {}

  async googleLogin() {
    this.isLoading = true;
    const { error } = await this.supabase.loginWithGoogle();
    this.isLoading = false;
    if (error) {
      this.toast.showError(error?.message || 'Login Failed', 'login');
    }
  }
}
