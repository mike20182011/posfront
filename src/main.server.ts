// main.server.ts
import 'zone.js';  // 🔹 Importante: siempre debe ir primero
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

// Componentes
import { AppComponent } from './app/app.component';
import { Login } from './app/auth/login/login';
import { DashboardLayoutComponent } from './app/dashboard/dashboard-layout.component';
//import { Dashboard } from './app/dashboard/dashboard.component';
import { ComprasComponent } from './app/compras/compras.component';
import { Dashboard } from './app/dashboard/dashboard';

export default function bootstrap() {
  return bootstrapApplication(AppComponent, {
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
  });
}
