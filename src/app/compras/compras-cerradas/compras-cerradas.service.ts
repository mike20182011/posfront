import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComprasCerradasService {
  private apiUrl = 'http://localhost:3000/compras/'; // Endpoint de compras cerradas

  constructor(private http: HttpClient) {}

  getComprasCerradas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?tipoCompra=CERRADA`);
  }

  crearCompra(compra: any): Observable<any> {
    // envio del modelo que enviaste por POST
    return this.http.post(`${this.apiUrl}`, compra);
  }
}
