import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ComprasCerradasService } from './compras-cerradas.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';


interface Barra {
  pesoGr: number;
  pureza: number;
  pesoFino: number;
  onzas: number;
  precioUnit: number;
  montoTotal: number;
}

interface Compra {
  id: number;
  proveedor: { nombre: string };
  barras: Barra[];
  precioUnit: number;
  tipoCompra: string;
  moneda: string;
  montoUSD: number;
  fecha: string;
}

@Component({
  selector: 'app-compras-cerradas',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, MatExpansionModule, MatTableModule,MatButtonModule, 
  MatIconModule, 
  CurrencyPipe,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,FormsModule],
  templateUrl: './compras-cerradas.component.html',
  styleUrls: ['./compras-cerradas.component.scss']
})
export class ComprasCerradasComponent implements OnInit {
  private comprasService = inject(ComprasCerradasService);

  compras: Compra[] = [];
  comprasFiltradas: Compra[] = [];

    monedaFiltro: string = 'TODOS'; // Por defecto "TODOS"
  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;
  proveedorFiltro: string = '';

  ngOnInit() {
    this.cargarCompras();
  }

  cargarCompras() {
    this.comprasService.getComprasCerradas().subscribe(data => {
      this.compras = data.filter((c: Compra) => c.tipoCompra === 'CERRADA');
       this.aplicarFiltros();
    });
  }

  //filtros 
   aplicarFiltros() {
    // 1️⃣ Filtramos por moneda
    let filtradas = this.monedaFiltro === 'TODOS' 
      ? [...this.compras] 
      : this.compras.filter(c => c.moneda === this.monedaFiltro);

    // 2️⃣ Filtramos por fechas
    if (this.fechaInicio) {
      filtradas = filtradas.filter(c => new Date(c.fecha) >= this.fechaInicio!);
    }
    if (this.fechaFin) {
      filtradas = filtradas.filter(c => new Date(c.fecha) <= this.fechaFin!);
    }

    // 3️⃣ Filtramos por proveedor
    if (this.proveedorFiltro) {
      const busqueda = this.proveedorFiltro.toLowerCase();
      filtradas = filtradas.filter(c => c.proveedor.nombre.toLowerCase().includes(busqueda));
    }

    this.comprasFiltradas = filtradas;
  }

  seleccionarMoneda(moneda: string) {
    this.monedaFiltro = moneda;
    this.aplicarFiltros();
  }

  seleccionarFechaInicio(event: any) {
    this.fechaInicio = event.value;
    this.aplicarFiltros();
  }

  seleccionarFechaFin(event: any) {
    this.fechaFin = event.value;
    this.aplicarFiltros();
  }

  buscarProveedor(event: any) {
    this.proveedorFiltro = event.target.value;
    this.aplicarFiltros();
  }

  limpiarFiltros() {
    this.monedaFiltro = 'TODOS';
    this.fechaInicio = null;
    this.fechaFin = null;
    this.proveedorFiltro = '';
    this.aplicarFiltros();
  }

}
