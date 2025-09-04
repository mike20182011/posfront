import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProveedoresService } from './proveedores.service';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // 👈 importa lo necesario
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent {
  proveedorForm: FormGroup;
  mensaje: string = '';

  constructor(private fb: FormBuilder, private proveedoresService: ProveedoresService) {
    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.proveedorForm.valid) {
      this.proveedoresService.addProveedor(this.proveedorForm.value).subscribe({
        next: () => {
          this.mensaje = 'Proveedor registrado con éxito ✅';
          this.proveedorForm.reset();
        },
        error: (err) => {
          this.mensaje = 'Error al registrar proveedor ❌';
          console.error(err);
        }
      });
    }
  }
}
