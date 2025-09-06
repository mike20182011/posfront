import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <h1>ALANDRI SRL</h1>
    </header>
  `,
  styles: [`
    .header {
      height: 60px;
      background-color: #1976d2;
      color: white;
      display: flex;
      align-items: center;
      padding: 0 16px;
    }
  `]
})
export class HeaderComponent {}
