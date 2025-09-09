import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComprasAbiertasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/compras-abiertas';

  getComprasAbiertas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearCompra(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  cerrarParcial(payload: any) {
  return this.http.post(`${this.apiUrl}/cerrar-parcial`, payload);
}

}
