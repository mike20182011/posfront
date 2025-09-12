import { Component, OnInit, ViewChild } from '@angular/core';
import { ProveedoresService } from '../proveedores/proveedores.service';
import { CierresService, CierreParcialDto } from './cierres.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { CierreParcialDialogComponent } from './cierre-parcial-dialog/cierre-parcial-dialog';

@Component({
  selector: 'app-cierres',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './cierres.component.html',
  styleUrls: ['./cierres.component.scss']
})
export class CierresComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'onzasUSD', 'onzasBOB'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private proveedoresService: ProveedoresService,
    private cierresService: CierresService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores() {
    this.proveedoresService.getProveedores().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error al cargar proveedores', err);
      }
    });
  }

  // 🔍 Filtro para buscador
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // 🟢 Abrir dialog de cierre parcial
  abrirCierreParcial() {
    const dialogRef = this.dialog.open(CierreParcialDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: CierreParcialDto | undefined) => {
      if (result) {
        console.log('Datos para cerrar parcial:', result);

        // 🔹 Llamada al POST del servicio
        this.cierresService.cerrarParcial(result).subscribe({
          next: (res) => {
            console.log('Cierre registrado correctamente', res);
            this.cargarProveedores(); // recargar datos después del cierre
          },
          error: (err) => {
            console.error('Error al registrar cierre parcial', err);
          }
        });
      }
    });
  }
}
