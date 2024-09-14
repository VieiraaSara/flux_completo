import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {
  private apiUrl = environment.baseApiUrl;  //api vindo do environment

  constructor(private http: HttpClient, private authService: AuthService) {}

  deletarUsuario(id_usuario: any, tkn:any):Observable<any>{
   const token =  this.authService.getToken();
    return this.http.delete(`${this.apiUrl}flux/excluir-usuario/${id_usuario}?token=${token}`,id_usuario) .pipe(
      catchError(this.handleError)
    )
  }
  private handleError(error: any) { // tratamento caso ocorra algum erro no serviço
    console.error('Erro no serviço:', error);
    return throwError(error);
  }
}
