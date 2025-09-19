import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProveedoresService } from './proveedores.service';
import { MatCard, MatCardActions } from '@angular/material/card';

@Component({
  selector: 'app-add-proveedor-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,MatCard,MatCardActions
  ],
  template: `
    <h2 mat-dialog-title>Nuevo Proveedor</h2>

    <mat-dialog-content [formGroup]="form" class="dialog-form">
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="nombre" required>
        <mat-error *ngIf="form.get('nombre')?.hasError('required')">
          El nombre es obligatorio
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Teléfono</mat-label>
        <input matInput formControlName="telefono" required>
        <mat-error *ngIf="form.get('telefono')?.hasError('required')">
          El teléfono es obligatorio
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Email</mat-label>
        <input matInput type="email" formControlName="email" required>
        <mat-error *ngIf="form.get('email')?.hasError('required')">
          El email es obligatorio
        </mat-error>
        <mat-error *ngIf="form.get('email')?.hasError('email')">
          Debe ser un email válido
        </mat-error>
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="cerrar()">Cancelar</button>
      <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid" (click)="onSubmit()">Guardar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
    }

    .full-width {
      width: 100%;
    }
  `]
})
export class AddProveedorDialog {
  private fb = inject(FormBuilder);
  private proveedoresService = inject(ProveedoresService);
  private dialogRef = inject(MatDialogRef<AddProveedorDialog>);

  form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    telefono: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit() {
    if (this.form.valid) {
      this.proveedoresService.addProveedor(this.form.value).subscribe(() => {
        this.dialogRef.close(true); // Cierra el diálogo y avisa que se añadió proveedor
      });
    }
  }

  cerrar() {
    this.dialogRef.close(false); // Cierra el diálogo sin cambios
  }
}
