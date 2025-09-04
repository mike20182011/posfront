import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="sidebar">
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/compras" routerLinkActive="active">Compras</a>
      <a routerLink="/proveedores" routerLinkActive="active">Proveedores</a>
    </nav>
  `,
  styles: [`
    .sidebar {
      width: 200px;
      background-color: #eeeeee;
      display: flex;
      flex-direction: column;
      padding: 16px;
    }
    .sidebar a {
      margin-bottom: 8px;
      text-decoration: none;
      color: black;
    }
    .sidebar a.active {
      font-weight: bold;
    }
  `]
})
export class SidebarComponent {}
