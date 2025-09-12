import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pago {
  id?: number;
  fecha?: string;
  monto: number;
  moneda: 'USD' | 'BOB';
  observacion: string;
  proveedorId: number;
  proveedorNombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private apiUrl = 'http://localhost:3000/pagos';

  constructor(private http: HttpClient) {}

  getPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.apiUrl}/todos-los-pagos`);
  }

  addPago(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(this.apiUrl, pago);
  }

  getBalanceProveedor(proveedorId: number) {
  return this.http.get<any>(`http://localhost:3000/pagos/balance-proveedor/${proveedorId}`);
}

}
