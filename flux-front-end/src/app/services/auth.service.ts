import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  login(credentials: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}flux/login`, credentials)
      .pipe(catchError(this.handleError));
  }

  // Save token to localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Refresh token
  refreshToken(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('Token não encontrado.'));
    }

    return this.http.post<any>(`${this.apiUrl}flux/refresh-token`, {}, { 
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }), 
      withCredentials: true 
    })
      .pipe(
        tap(response => {
          if (response && response.token) {
            console.log('Token gerado com sucesso:', response.token);
            this.saveToken(response.token);
          }
        }),
        catchError(this.handleError)
      );
  }

  // Sign out and remove token
  signOutExternal(): void {
    this.deleteToken();
    console.log("Token removido");
  }

  // Delete token from localStorage
  deleteToken(): void {
    localStorage.removeItem('token');
  }

  // Check if the user is authenticated
  get isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Handle errors
  private handleError(error: any) {
    console.error('Erro no serviço:', error);
    return throwError(() => new Error('Ocorreu um erro no serviço.'));
  }
}
