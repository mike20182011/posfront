import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `<h2>Bienvenido al Dashboard</h2>`,
})
export class Dashboard {}
