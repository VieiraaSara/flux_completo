import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Banco {
  id_banco: number;
  name: string;
  image: string;
}

interface Conta {
  fkBancoId: number;
  usuario_id: number;
  id_conta: number;
  saldo: string;
  tipo_conta: string;
  Banco: Banco;
}

interface Pix {
  id?: string;
  key_type: string;
  key: string;
  conta_bancaria_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class PixService {
  private apiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  cadastrarPix(token: string, pix: Pix): Promise<any> {
    return this.http.post(`${this.apiUrl}cadastrar-chave?token=${token}`, pix)
      .toPromise()
      .then(response => response);
  }


  verifyCode( id: string, token: string, code: any):Observable<any> {
    return this.http.put<any>(`${this.apiUrl}pix/key/${id}/verify?token=${token}`, {"code":code}).pipe(
      catchError(this.handleError)
    )
  }

  resendCode(id: string, token: string, code: any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}pix/key/${id}/resendVerificationCode?token=${token}`, {"code":code})
  }

  getChavePix(token:string) : Observable<any> {
    return this.http.get(`${this.apiUrl}pix?token=${token}`)
  }

  
  getContaBancaria(token: string): Promise<Conta[]> {
    return this.http.get<Conta[]>(`${this.apiUrl}conta/listar-contas?token=${token}`)
      .pipe(
        catchError(this.handleError)
      )
      .toPromise()
      .then(response => response || []);
  }

  private handleError(error: any) {
    console.error('Erro ocorreu:', error);
    let errorMessage = 'Algo deu errado, tente novamente mais tarde.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
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
  }
}
