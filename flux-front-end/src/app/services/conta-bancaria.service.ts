import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Conta {
  fkBancoId: number;
  saldo: number;
  tipo_conta: string;
}

interface Banco {
  id_banco:number;
  id: number;
  name: string;
  image: string;

}

@Injectable({
  providedIn: 'root'
})
export class ContaBancariaService {
  private apiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  cadastrarConta(token: string, conta: Conta): Promise<any> {
    return this.http.post(`http://localhost:3000/conta/criar-conta-bancaria?token=${token}`, conta).toPromise();
  }



  getInstituicoes(token: string): Promise<Banco[]> {
    return this.http.get<Banco[]>(`${this.apiUrl}banco/listar-bancos?token=${token}`)
      .pipe(
        catchError(this.handleError)
      )
      .toPromise()
      .then(response => response || []); // Retorna um array vazio se a resposta for undefined ou null
  }


  getContasBancariasList(token: string): Observable<any> {


    return this.http.get(`${this.apiUrl}conta/listar-contas?token=${token}`).pipe(
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

    return Promise.reject(new Error(errorMessage)); // Lança um erro para que o Promise rejeite
  }
}
