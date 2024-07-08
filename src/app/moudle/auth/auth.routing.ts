import { RouterModule, Routes } from '@angular/router';
import { LocalGuard } from '../../../core/guards/local.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [LocalGuard],
    component: LoginComponent,
  },
];

export const AuthRoutes = RouterModule.forChild(routes);
