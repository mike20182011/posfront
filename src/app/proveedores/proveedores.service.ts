import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Proveedor {
  id?: number;
  nombre: string;
  telefono: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  private apiUrl = 'http://localhost:3000/proveedores';

  constructor(private http: HttpClient) {}

  // Crear un nuevo proveedor
  addProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.apiUrl, proveedor); 
    // 👆 El interceptor ya agrega el token automáticamente
  }

  // Listar proveedores
  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl); 
  }

  // Aquí puedes ir añadiendo más métodos (editar, eliminar, buscar, etc.)
}
