import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { PagosService } from '../pagos.service';

@Component({
  selector: 'app-add-pago-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent
  ],
  templateUrl: './pago-dialog.component.html',
})
export class AddPagoDialog {
  pagoForm: FormGroup;
  saldoDisponible: number | null = null;
  balanceActual: any = null;

  private fb = inject(FormBuilder);
  private pagosService = inject(PagosService);

  constructor(
    private dialogRef: MatDialogRef<AddPagoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.pagoForm = this.fb.group({
      proveedorId: [null, Validators.required],
      monto: [null, Validators.required],
      moneda: ['USD', Validators.required],
      observacion: [''],
    });

    // 👉 cambios en proveedor
    this.pagoForm.get('proveedorId')?.valueChanges.subscribe(proveedorId => {
      if (proveedorId) {
        this.cargarBalanceProveedor(proveedorId);
      }
    });

    // 👉 cambios en moneda
    this.pagoForm.get('moneda')?.valueChanges.subscribe(moneda => {
      if (this.balanceActual) {
        this.actualizarSaldo(moneda);
      }
    });
  }

  private cargarBalanceProveedor(proveedorId: number) {
    this.pagosService.getBalanceProveedor(proveedorId).subscribe(balance => {
      this.balanceActual = balance;
      this.actualizarSaldo(this.pagoForm.get('moneda')?.value);
    });
  }

  private actualizarSaldo(moneda: 'USD' | 'BOB') {
    if (!this.balanceActual) return;
    this.saldoDisponible =
      moneda === 'USD'
        ? this.balanceActual.saldoUSD
        : this.balanceActual.saldoBOB;
  }

  guardar() {
    if (this.pagoForm.valid) {
      this.pagosService.addPago(this.pagoForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
