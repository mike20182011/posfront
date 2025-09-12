// cierres.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// cierres.service.ts
export interface OnzasPorMoneda {
  moneda: 'USD' | 'BOB';
  totalOnzas: number;
}

export interface CierreProveedor {
  proveedorId: number;
  proveedorNombre: string;
  onzasPorMoneda: OnzasPorMoneda[];
}


@Injectable({
  providedIn: 'root'
})
export class CierresService {
  private apiUrl = 'http://localhost:3000/compras-abiertas';

  constructor(private http: HttpClient) {}

  getOnzasPorProveedor(): Observable<CierreProveedor[]> {
    return this.http.get<CierreProveedor[]>(`${this.apiUrl}/total-onzas-proveedor`);
  }


  
}
