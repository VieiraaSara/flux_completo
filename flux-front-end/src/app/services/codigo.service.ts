import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CodigoService {
  private apiUrl = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getCode(user: any) {
    return this.http.post(`${this.apiUrl}flux/cadastro-usuario`, user) //passa a api e a rota q tem q entrar
      .pipe(
        catchError(throwError)
      )
      .toPromise();
  }
}
