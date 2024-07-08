import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SupabaseService } from '../../../../../core/service/supabase.service';
import { ToastService } from '../../../../../core/service/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  title: string = 'MotorFit';
  isLoading: boolean = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly supabase: SupabaseService,
    private readonly toastService: ToastService
  ) {}

  session = this.supabase.session;

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session));
  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onLoginWithEmail() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.supabase
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
