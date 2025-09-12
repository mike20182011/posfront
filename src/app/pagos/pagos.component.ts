import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PagosService, Pago } from './pagos.service';
import { ProveedoresService, Proveedor } from '../proveedores/proveedores.service';
import { AddPagoDialog } from './pagos-dialog/pago-dialog.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
  MatInputModule
   
  ],
  templateUrl: './pagos.component.html',
})
export class PagosComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'proveedorNombre', 'monto', 'moneda', 'observacion'];
  dataSource = new MatTableDataSource<Pago>([]);
  pagosOriginal: Pago[] = []; // ✅ mantenemos todos los pagos
  proveedores: Proveedor[] = [];

  private pagosService = inject(PagosService);
  private proveedoresService = inject(ProveedoresService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.cargarPagos();
    this.proveedoresService.getProveedores().subscribe(provs => {
      this.proveedores = provs;
    });
  }

  cargarPagos() {
    this.pagosService.getPagos().subscribe(pagos => {
      this.pagosOriginal = pagos;
      this.dataSource.data = pagos;
    });
  }

  // 🔍 Buscador por nombre de proveedor
  applyFilter(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.data = this.pagosOriginal.filter(p =>
      p.proveedorNombre.toLowerCase().includes(filtro)
    );
  }

  // 💰 Filtro por moneda
  filtrarPorMoneda(moneda: 'TODOS' | 'USD' | 'BOB') {
    if (moneda === 'TODOS') {
      this.dataSource.data = this.pagosOriginal;
    } else {
      this.dataSource.data = this.pagosOriginal.filter(p => p.moneda === moneda);
    }
  }

  abrirDialogo() {
    const dialogRef = this.dialog.open(AddPagoDialog, {
      width: '500px',
      data: { proveedores: this.proveedores }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarPagos(); // refrescar tabla
      }
    });
  }
}
