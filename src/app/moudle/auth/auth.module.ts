import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AuthRoutes } from './auth.routing';
import { SocialLoginComponent } from './components/social-login/social-login.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutes,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent, SocialLoginComponent],
})
export class AuthModule {}
