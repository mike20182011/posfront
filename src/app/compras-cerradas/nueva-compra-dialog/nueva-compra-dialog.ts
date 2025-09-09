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
    moneda: ['USD', Validators.required], // 👈 por defecto USD
    descuento: [null],
    tipoCambio: [null],
    usuarioId: [1, Validators.required], // luego lo podemos hacer dinámico
    proveedorId: [null, Validators.required],
    precioUnit: [0, Validators.required],
    barras: this.fb.array([])
  });

  get barras(): FormArray {
    return this.form.get('barras') as FormArray;
  }

  ngOnInit() {
    this.cargarProveedores();
    this.nuevaBarra(); // al menos 1 barra por defecto

    // 👇 Escuchamos cambios en la moneda para cambiar validadores dinámicamente
    this.form.get('moneda')!.valueChanges.subscribe(moneda => {
  if (moneda === 'USD') {
    this.form.get('descuento')!.setValidators([Validators.required]);
    this.form.get('tipoCambio')!.clearValidators();
    this.form.get('tipoCambio')!.setValue(null);
  } else if (moneda === 'BOB') {
    this.form.get('tipoCambio')!.setValidators([Validators.required]);
    this.form.get('descuento')!.clearValidators();
    this.form.get('descuento')!.setValue(null);
  }
  this.form.get('descuento')!.updateValueAndValidity();
  this.form.get('tipoCambio')!.updateValueAndValidity();
});

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
    const data: any = { ...this.form.value };

    if (data.moneda === 'USD') {
      delete data.tipoCambio;   // eliminar por completo
      // Asegurar que descuento sea número
      if (data.descuento === null) {
        data.descuento = 0;
      }
    } else if (data.moneda === 'BOB') {
      delete data.descuento;    // eliminar por completo
    }

    this.comprasService.crearCompra(data).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}


  cancelar() {
    this.dialogRef.close(false);
  }
}
