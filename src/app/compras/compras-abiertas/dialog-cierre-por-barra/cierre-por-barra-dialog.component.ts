import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ComprasAbiertasService } from '../compras-abiertas.service';

@Component({
  selector: 'app-cierre-por-barra-dialog',
  templateUrl: './cierre-por-barra-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule
  ]
})
export class CierrePorBarraDialogComponent {
  form: FormGroup;
  barrasSeleccionadas: number[] = [];

  constructor(
    private fb: FormBuilder,
    private service: ComprasAbiertasService,
    private dialogRef: MatDialogRef<CierrePorBarraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      precioUnitActual: [0, Validators.required],
      descuento: [null],
      tipoCambio: [null]
    });

    // reglas de validación según la moneda
    if (this.data?.moneda === 'USD') {
      this.form.get('descuento')?.setValidators([Validators.required]);
      this.form.get('tipoCambio')?.clearValidators();
    } else if (this.data?.moneda === 'BOB') {
      this.form.get('tipoCambio')?.setValidators([Validators.required]);
      this.form.get('descuento')?.clearValidators();
    }
    this.form.updateValueAndValidity();
  }

  toggleBarra(barraId: number, event: any) {
    if (event.checked) {
      this.barrasSeleccionadas.push(barraId);
    } else {
      this.barrasSeleccionadas = this.barrasSeleccionadas.filter(id => id !== barraId);
    }
  }

  guardar() {
    if (this.form.valid && this.barrasSeleccionadas.length > 0) {
      const payload: any = {
        barraIds: this.barrasSeleccionadas,
        ...this.form.value
      };

      // limpiar campos innecesarios
      if (this.data?.moneda === 'USD') {
        delete payload.tipoCambio;
      }
      if (this.data?.moneda === 'BOB') {
        delete payload.descuento;
      }

      this.service.cerrarBarras(payload).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
