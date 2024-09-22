import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface ContaBancos{
  id_contaBancos?: number
}


@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  private apiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getHome(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}home?token=${token}`);
  }

  fazerTransacao(token:string, id_contaBancos:  any, transacaoEnvio:any): Observable<any>{
    console.log(id_contaBancos)
    return this.http.post(`${this.apiUrl}conta/realizar-transferencia/conta-bancaria/${id_contaBancos}?token=${token}`, transacaoEnvio)
  }
}
