import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ComprasCerradasService } from './compras-cerradas.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';

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
}

@Component({
  selector: 'app-compras-cerradas',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, MatExpansionModule, MatTableModule],
  templateUrl: './compras-cerradas.component.html',
  styleUrls: ['./compras-cerradas.component.scss']
})
export class ComprasCerradasComponent implements OnInit {
  private comprasService = inject(ComprasCerradasService);

  compras: Compra[] = [];

  ngOnInit() {
    this.cargarCompras();
  }

  cargarCompras() {
    this.comprasService.getComprasCerradas().subscribe(data => {
      this.compras = data.filter((c: Compra) => c.tipoCompra === 'CERRADA');
    });
  }
}
