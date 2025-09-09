import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ComprasCerradasService } from '../../compras/compras-cerradas/compras-cerradas.service';
import { ProveedoresService } from '../../proveedores/proveedores.service';
//import { ComprasCerradasService } from '../compras-cerradas.service';
//import { ProveedoresService } from '../proveedores.service';

@Component({
  selector: 'app-nueva-compra-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule
  ],
  templateUrl: './nueva-compra-dialog.html'
})
export class NuevaCompraDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private comprasService = inject(ComprasCerradasService);
  private proveedoresService = inject(ProveedoresService);
  private dialogRef = inject(MatDialogRef<NuevaCompraDialogComponent>);

  proveedores: any[] = [];

  form: FormGroup = this.fb.group({
    tipoCompra: ['CERRADA', Validators.required],
    moneda: ['USD', Validators.required],
    descuento: [0],
    usuarioId: [1, Validators.required], // luego lo podemos hacer dinámico
    proveedorId: [null, Validators.required], // se llena desde el select
    precioUnit: [0, Validators.required],
    barras: this.fb.array([])
  });

  get barras(): FormArray {
    return this.form.get('barras') as FormArray;
  }

  ngOnInit() {
    this.cargarProveedores();
    this.nuevaBarra(); // por defecto al menos 1 barra
  }

  cargarProveedores() {
    this.proveedoresService.getProveedores().subscribe(data => {
      this.proveedores = data;
    });
  }

  nuevaBarra() {
    const barra = this.fb.group({
      pesoGr: [0, Validators.required],
      purezaArriba: [0.99, Validators.required],
      purezaAbajo: [0.99, Validators.required],
      purezaDerecha: [0.99, Validators.required],
      purezaIzquierda: [0.99, Validators.required],
    });
    this.barras.push(barra);
  }

  eliminarBarra(index: number) {
    this.barras.removeAt(index);
  }

  guardar() {
    if (this.form.valid) {
      this.comprasService.crearCompra(this.form.value).subscribe(() => {
        this.dialogRef.close(true); // cerrar y refrescar
      });
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
