// cierres.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces existentes
export interface OnzasPorMoneda {
  moneda: 'USD' | 'BOB';
  totalOnzas: number;
}

export interface CierreProveedor {
  proveedorId: number;
  proveedorNombre: string;
  onzasPorMoneda: OnzasPorMoneda[];
}

// Nuevo DTO para cierre parcial
export interface CierreParcialDto {
  proveedorId: number;
  moneda: 'USD' | 'BOB';
  onzasCerradas: number;
  precioUnitario: number;
  descuento?: number;
  tipoCambio?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CierresService {
  private apiUrl = 'http://localhost:3000/compras-abiertas'; // para onzas
  private apiCierreUrl = 'http://localhost:3000/cierres-proveedor'; // para cerrar parcial

  constructor(private http: HttpClient) {}

  // GET: onzas por proveedor
  getOnzasPorProveedor(): Observable<CierreProveedor[]> {
    return this.http.get<CierreProveedor[]>(`${this.apiUrl}/total-onzas-proveedor`);
  }

  // POST: cerrar parcialmente
  cerrarParcial(data: CierreParcialDto): Observable<any> {
    return this.http.post(`${this.apiCierreUrl}/cerrar-parcial`, data);
  }
}
