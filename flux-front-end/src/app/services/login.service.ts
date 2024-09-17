import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.baseApiUrl;  //api vindo do environment

  constructor(private http: HttpClient) {}



// A função cadastrar pega o usuário e envia para a url http://localhost:3000/flux/cadastro-usuario
  cadastrar(user: any) {
    return this.http.post(`${this.apiUrl}flux/cadastro-usuario`, user) //passa a api e a rota q tem q entrar
      .pipe(
        catchError(this.handleError)
      )
      .toPromise();
  }
// A função login pega as credenciais e envia para a url http://localhost:3000/flux/login
  login(credentials: any) {
    return this.http.post(`${this.apiUrl}flux/login`, credentials)
      .pipe(
        catchError(this.handleError)
      )
      .toPromise()
      .then((response: any) => response.token); // aqui gera o token de login
  }

  private handleError(error: any) { // tratamento caso ocorra algum erro no serviço
    console.error('Erro no serviço:', error);
    return throwError(error);
  }
}
