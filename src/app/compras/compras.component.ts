import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Compras</h2>
    <form>
      <!-- tu formulario aquí -->
      <label>Producto:</label>
      <input type="text" />
      <button type="submit">Guardar</button>
    </form>
  `,
})
export class ComprasComponent {}
