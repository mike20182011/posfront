import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ComprasAbiertasService } from '../compras-abiertas.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cierre-parcial-dialog',
  templateUrl: './cierre-parcial-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyPipe,
    DatePipe,
    MatDialogModule,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ]
})
export class CierreParcialDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ComprasAbiertasService,
    private dialogRef: MatDialogRef<CierreParcialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      onzasCerradas: [0, Validators.required],
      precioUnitActual: [0, Validators.required],
      descuento: [null],
      tipoCambio: [null]
    });

    // ✅ Configurar validadores dinámicos según la moneda
    if (this.data?.moneda === 'USD') {
      this.form.get('descuento')?.setValidators([Validators.required]);
      this.form.get('descuento')?.setValue(this.data?.descuento || null);

      this.form.get('tipoCambio')?.clearValidators();
      this.form.get('tipoCambio')?.reset();
    }

    if (this.data?.moneda === 'BOB') {
      this.form.get('tipoCambio')?.setValidators([Validators.required]);
      this.form.get('tipoCambio')?.setValue(this.data?.tipoCambio || null);

      this.form.get('descuento')?.clearValidators();
      this.form.get('descuento')?.reset();
    }

    this.form.updateValueAndValidity();
  }

  guardar() {
    if (this.form.valid) {
      const payload: any = {
        compraAbiertaId: this.data?.compraAbiertaId,
        ...this.form.value
      };

      // 🚫 Limpiar campos no aplicables
      if (this.data?.moneda === 'USD') {
        delete payload.tipoCambio;
      }
      if (this.data?.moneda === 'BOB') {
        delete payload.descuento;
      }

      this.service.cerrarParcial(payload).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
