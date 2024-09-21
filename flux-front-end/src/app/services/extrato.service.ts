import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ExtratoService {
  private apiUrl = environment.baseApiUrl;
  constructor(private http: HttpClient) { }




  getExtratoGeral(token: string): Observable<any> {


    return this.http.get(`${this.apiUrl}impressao-geral?token=${token}`).pipe(
      catchError(this.handleError)
    );

  }
  private handleError(error: any) {
    console.error('Erro ocorreu:', error);
    let errorMessage = 'Algo deu errado, tente novamente mais tarde.';

    if (error.error instanceof ErrorEvent) {
      // Erro no cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro no backend
      switch (error.status) {
        case 400:
          errorMessage = 'Solicitação inválida. Verifique os dados enviados.';
          break;
        case 404:
          errorMessage = 'Recurso não encontrado.';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
          break;
        default:
          errorMessage = `Erro: ${error.message}`;
          break;
      }
    }

    return Promise.reject(new Error(errorMessage));
}}
