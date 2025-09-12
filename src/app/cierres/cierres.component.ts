import { Component, OnInit } from '@angular/core';
import { Proveedor, ProveedoresService } from '../proveedores/proveedores.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cierres',
  standalone: true,   // 👈 importante
  imports: [
    CommonModule,
    MatTableModule     // 👈 aquí importamos Material Table
  ],
  templateUrl: './cierres.component.html',
  styleUrls: ['./cierres.component.scss']
})
export class CierresComponent implements OnInit {
  proveedores: Proveedor[] = [];

  constructor(private proveedoresService: ProveedoresService) {}

  ngOnInit(): void {
    this.proveedoresService.getProveedores().subscribe({
      next: (data) => {
        this.proveedores = data;
      },
      error: (err) => {
        console.error('Error al cargar proveedores', err);
      }
    });
  }
}
