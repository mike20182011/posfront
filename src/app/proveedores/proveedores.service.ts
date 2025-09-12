import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface BalanceProveedor {
  proveedorId: number;
  nombre: string;
  saldoUSD: number;
  saldoBOB: number;
  deudaComprasUSD: number;
  deudaComprasBOB: number;
  deudaCierresUSD: number;
  deudaCierresBOB: number;
  deudaTotalUSD: number;
  deudaTotalBOB: number;
  pagosTotalUSD: number;
  pagosTotalBOB: number;
}


export interface Proveedor {
  id?: number;
  nombre: string;
  telefono: string;
  email: string;
   onzasUSD?: number;  // 👈 agregamos
  onzasBOB?: number;  // 👈 agregamos
}

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  private apiUrl = 'http://localhost:3000/proveedores';
  private apiUrl2 = 'http://localhost:3000/pagos';
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


   getBalancesProveedores(): Observable<BalanceProveedor[]> {
    return this.http.get<BalanceProveedor[]>(`${this.apiUrl2}/balance-general-todos`);
  }
  // Aquí puedes ir añadiendo más métodos (editar, eliminar, buscar, etc.)
}
