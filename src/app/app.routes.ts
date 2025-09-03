import { provideRouter, RouterModule, Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'dashboard', component: Dashboard }
];
