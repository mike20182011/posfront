import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
//import { ComprasAbiertasService } from '../compras-abiertas.service';
import { ProveedoresService } from '../../proveedores/proveedores.service';
import { ComprasAbiertasService } from '../../compras/compras-abiertas/compras-abiertas.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-nueva-compra-abierta-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIcon
  ],
  templateUrl: './nueva-compra-abierta-dialog.component.html'
})
export class NuevaCompraAbiertaDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private comprasService = inject(ComprasAbiertasService);
  private proveedoresService = inject(ProveedoresService);
  private dialogRef = inject(MatDialogRef<NuevaCompraAbiertaDialogComponent>);

  proveedores: any[] = [];

  form: FormGroup = this.fb.group({
    usuarioId: [1, Validators.required], // luego se hace dinámico
    proveedorId: [null, Validators.required],
    precioInicial: [0, Validators.required],
    moneda: ['USD', Validators.required],
    descuentoPorcentaje: [null],
    tipoCambio: [null],
    barras: this.fb.array([])
  });

  get barras(): FormArray {
    return this.form.get('barras') as FormArray;
  }

  ngOnInit() {
    this.cargarProveedores();
    this.nuevaBarra();

    // 🔹 Suscripción a cambios de moneda
    this.form.get('moneda')?.valueChanges.subscribe(moneda => {
      if (moneda === 'USD') {
        this.form.get('descuentoPorcentaje')?.setValidators([Validators.required]);
        this.form.get('tipoCambio')?.clearValidators();
        this.form.get('tipoCambio')?.setValue(null);
      } else if (moneda === 'BOB') {
        this.form.get('tipoCambio')?.setValidators([Validators.required]);
        this.form.get('descuentoPorcentaje')?.clearValidators();
        this.form.get('descuentoPorcentaje')?.setValue(null);
      }
      this.form.get('descuentoPorcentaje')?.updateValueAndValidity();
      this.form.get('tipoCambio')?.updateValueAndValidity();
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
      const data = { ...this.form.value };

      // 🔹 Normalizamos los campos según la moneda
      if (data.moneda === 'USD') {
        data.tipoCambio = null;
      } else if (data.moneda === 'BOB') {
        data.descuentoPorcentaje = null;
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
