import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { jwtDecode } from 'jwt-decode';

=======
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
>>>>>>> 66b3ce12898191929b0eea5ce3e1939e6551f522
@Injectable({
  providedIn: 'root'
})
export class AuthService {

<<<<<<< HEAD
  constructor() { }

  // Método para recuperar o token armazenado
  getToken(): string | null {
    return localStorage.getItem('token'); // Ajuste conforme a sua implementação de armazenamento de token
  }

=======
  private apiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  login(credentials: any): Promise<string> {
    return this.http.post(`${this.apiUrl}flux/login`, credentials)
      .pipe(
        catchError(this.handleError)
      )
      .toPromise()
      .then((response: any) => response.token);
  }

  public signOutExternal = () => {
    localStorage.removeItem('token');
    console.log("token deleted");
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  refreshToken(): Observable<any> {
    const token = this.getToken();  
    if (!token) {
      return throwError(() => new Error('Token não encontrado.'));
    }

    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}flux/refresh-token`, { token }, { headers: header, withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  get isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private handleError(error: any) {
    console.error('Erro no serviço:', error);
    return throwError(error);
  }
>>>>>>> 66b3ce12898191929b0eea5ce3e1939e6551f522
}
