// main.server.ts
import 'zone.js';  // 🔹 Importante: siempre debe ir primero
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';

// Componentes
import { AppComponent } from './app/app.component';
import { Login } from './app/auth/login/login';
import { DashboardLayoutComponent } from './app/dashboard/dashboard-layout.component';
import { ComprasComponent } from './app/compras/compras.component';
import { Dashboard } from './app/dashboard/dashboard';
import { ProveedoresComponent } from './app/proveedores/proveedores.component';
import { AuthInterceptor } from './app/auth/auth.interceptor';

export default function bootstrap() {
  return bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(withInterceptorsFromDi()), // 👈 necesario para interceptores
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
          ]
        }
      ])
    ]
  });
}
