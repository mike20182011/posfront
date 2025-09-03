import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { Login } from './app/auth/login/login';
import { DashboardLayoutComponent } from './app/dashboard/dashboard-layout.component';
import { Dashboard } from './app/dashboard/dashboard';
import { ComprasComponent } from './app/compras/compras.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login },
      {
        path: '',
        component: DashboardLayoutComponent,
        children: [
          { path: 'dashboard', component: Dashboard },
          { path: 'compras', component: ComprasComponent },
        ]
      }
    ])
  ]
}).catch(err => console.error(err));
