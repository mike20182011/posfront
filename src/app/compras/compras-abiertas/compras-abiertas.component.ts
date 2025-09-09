import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ComprasAbiertasService } from './compras-abiertas.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NuevaCompraAbiertaDialogComponent } from '../../compras-abiertas/nueva-compra-abierta-dialog/nueva-compra-abierta-dialog.component';
import { CierreParcialDialogComponent } from './dialog-cierre-parcial/cierre-parcial-dialog.component';


interface Barra {
  id: number;
  pesoGr: number;
  pureza: number;
  pesoFino: number;
  onzas: number;
  montoUSD: number;
  montoBOB: number | null;
}

interface CompraAbierta {
  id: number;
  fecha: string;
  moneda: string;
  descuento: number | null;
  tipoCambio: number | null;
  precioInicial: number;
  onzasTotales: number;
  montoTotal: number;
  montoBOB: number | null;
  proveedor: { nombre: string };
  usuario: { nombre: string };
  barras: Barra[];
}

@Component({
  selector: 'app-compras-abiertas',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  templateUrl: './compras-abiertas.component.html',
  styleUrls: ['./compras-abiertas.component.scss']
})
export class ComprasAbiertasComponent implements OnInit {
  private comprasService = inject(ComprasAbiertasService);

  private dialog = inject(MatDialog);


  compras: CompraAbierta[] = [];
  comprasFiltradas: CompraAbierta[] = [];

  // Filtros
  monedaFiltro: string = 'TODOS';
  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;
  proveedorFiltro: string = '';

  ngOnInit() {
    this.cargarCompras();
  }

  cargarCompras() {
    this.comprasService.getComprasAbiertas().subscribe(data => {
      this.compras = data;
      this.aplicarFiltros();
    });
  }

  aplicarFiltros() {
    let filtradas = this.monedaFiltro === 'TODOS'
      ? [...this.compras]
      : this.compras.filter(c => c.moneda === this.monedaFiltro);

    if (this.fechaInicio) {
      filtradas = filtradas.filter(c => new Date(c.fecha) >= this.fechaInicio!);
    }
    if (this.fechaFin) {
      filtradas = filtradas.filter(c => new Date(c.fecha) <= this.fechaFin!);
    }

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

  abrirDialogNuevaCompra() {
    const dialogRef = this.dialog.open(NuevaCompraAbiertaDialogComponent, {
       width: '1200px',
    maxWidth: '100vw', // 👈 evita que Angular Material limite el ancho
    height: '90vh',    // 👈 opcional, altura casi toda la pantalla
    disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarCompras(); // refresca la lista
      }
    });
  }

 abrirCierreParcial(compra: any) {
  const dialogRef = this.dialog.open(CierreParcialDialogComponent, {
    width: '400px',
    //disableClose: true,
    data: { 
      compraAbiertaId: compra.id,
      proveedor: compra.proveedor.nombre,
      numeroCompra: compra.id
    }  // ✅ aquí pasamos el id
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.cargarCompras(); // refresca lista si hace falta
    }
  });
}

  
}
