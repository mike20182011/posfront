import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ComprasAbiertasService } from '../compras-abiertas.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
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
  imports: [CommonModule,
    CurrencyPipe,
    DatePipe,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
CommonModule, ReactiveFormsModule, MatDialogModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIcon]
})
export class CierreParcialDialogComponent {
   form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ComprasAbiertasService,
    private dialogRef: MatDialogRef<CierreParcialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // aquí viene la compra seleccionada
  ) {
    this.form = this.fb.group({
      //barraId: [null, Validators.required],
      onzasCerradas: [0, Validators.required],
      precioUnitActual: [0, Validators.required],
      descuento: [0, Validators.required]
    });
  }

  guardar() {
    const payload = {
      compraAbiertaId: this.data.compraAbiertaId,
      ...this.form.value
    };

    this.service.cerrarParcial(payload).subscribe(() => {
      this.dialogRef.close(true);
    });
  }


  cancelar() {
    this.dialogRef.close(false);
  }
}
