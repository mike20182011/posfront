import { Component, OnInit, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProveedoresService, Proveedor } from './proveedores.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProveedorDialog } from './proveedor-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,  // ✅ Agregado
  MatInputModule  
  ],
  templateUrl: './proveedores.component.html',
})
export class ProveedoresComponent implements OnInit, AfterViewInit {
  private proveedoresService = inject(ProveedoresService);
  private dialog = inject(MatDialog);

  proveedores: Proveedor[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'telefono', 'email'];
  dataSource = new MatTableDataSource<Proveedor>([]);

  filtro: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.cargarProveedores();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarProveedores() {
    this.proveedoresService.getProveedores().subscribe(data => {
      this.proveedores = data;
      this.dataSource.data = this.proveedores;
    });
  }

  abrirDialogo() {
    const dialogRef = this.dialog.open(AddProveedorDialog, { width: '400px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarProveedores(); // refresca la tabla si se añadió proveedor
      }
    });
  }

  // función para aplicar filtro
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
