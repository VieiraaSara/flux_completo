import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {
  private apiUrl = environment.baseApiUrl;  //api vindo do environment

  constructor(private http: HttpClient, private authService: AuthService) {}

  atualizarInformacoesUsuario(user: any, id: number, token: string) {
    const tokenUrl = this.authService.getToken();


    return this.http.post(`${this.apiUrl}flux/refresh-token?token=${tokenUrl}`, {})
      .toPromise()
      .then((response: any) => {

        if (response && response.token) {
          // alert('TOKEN GERADO COM SUCESSO: ' + response.token);
           this.http.post(`${this.apiUrl}flux/refresh-token?token=${response.token}`, {})
          localStorage.clear();
          localStorage.setItem('token',response.token )
          return this.http.patch(`${this.apiUrl}flux/atualizar-usuario/${id}?token=${response.token}`, user).toPromise()
          .then((dadosUser: any)=>{
            // alert('TOKEN GERADO COM SUCESSO: 2 ' + JSON.stringify(dadosUser))

            this.authService.login(dadosUser);
            return dadosUser;
          });

        } else {
          throw new Error('Token não encontrado na resposta da atualização de usuário.');
        }
      })
      .catch(this.handleError);
  }
  private handleError(error: any) {
    console.error('Erro no serviço:', error);
    return throwError(error);
  }

}







