import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigFluxService {
  private apiUrl = environment.baseApiUrl;  //api vindo do environment

  constructor(private http: HttpClient) {}

  listarUsuario(id: number, token: string): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}flux/buscar-usuario/${id}?token=${token}`, { headers });
  }


}
