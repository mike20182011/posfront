import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { Login } from './app/auth/login/login';
import { DashboardLayoutComponent } from './app/dashboard/dashboard-layout.component';
import { Dashboard } from './app/dashboard/dashboard';
import { ComprasComponent } from './app/compras/compras.component';
import { ProveedoresComponent } from './app/proveedores/proveedores.component';
import { AuthInterceptor } from './app/auth/auth.interceptor';
import { ComprasCerradasComponent } from './app/compras/compras-cerradas/compras-cerradas.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // 👈 activa interceptores
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login },
      {
        path: '',
        component: DashboardLayoutComponent,
        children: [
          { path: 'dashboard', component: Dashboard },
          { path: 'compras', component: ComprasComponent },
          { path: 'proveedores', component: ProveedoresComponent },
          { path: 'compras/cerradas', component: ComprasCerradasComponent }

        ]
      }
    ])
  ]
}).catch(err => console.error(err));
