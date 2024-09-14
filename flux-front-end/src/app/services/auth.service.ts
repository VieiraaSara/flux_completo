import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Método para recuperar o token armazenado
  getToken(): string | null {
    return localStorage.getItem('token'); // Ajuste conforme a sua implementação de armazenamento de token
  }

}
