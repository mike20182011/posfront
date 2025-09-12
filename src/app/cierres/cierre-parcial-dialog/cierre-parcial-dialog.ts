import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ProveedoresService, Proveedor } from '../../proveedores/proveedores.service';
import { CierreParcialDto } from '../cierres.service';

@Component({
  selector: 'app-cierre-parcial-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule  
  ],
  templateUrl: './cierre-parcial-dialog.html',
})
export class CierreParcialDialogComponent implements OnInit {
  proveedores: Proveedor[] = [];
  form!: FormGroup;

  constructor(private dialogRef: MatDialogRef<CierreParcialDialogComponent>,
              private proveedoresService: ProveedoresService) {}

  ngOnInit() {
    this.proveedoresService.getProveedores().subscribe(p => this.proveedores = p);

    this.form = new FormGroup({
      proveedorId: new FormControl(0),
      moneda: new FormControl('BOB'),
      onzasCerradas: new FormControl(0),
      precioUnitario: new FormControl(0),
      tipoCambio: new FormControl(0),
      descuento: new FormControl(0)
    });

    // Opcional: escuchar cambios de moneda para habilitar/deshabilitar campos
    this.form.get('moneda')?.valueChanges.subscribe(moneda => {
      if (moneda === 'USD') {
        this.form.get('tipoCambio')?.disable();
        this.form.get('descuento')?.enable();
      } else {
        this.form.get('tipoCambio')?.enable();
        this.form.get('descuento')?.disable();
      }
    });
  }

  cerrar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value as CierreParcialDto);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
