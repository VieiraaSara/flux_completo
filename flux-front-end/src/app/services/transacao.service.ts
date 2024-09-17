import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  private apiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getHome(token: string): Observable<any> {

    return this.http.get(`${this.apiUrl}home?token=${token}`);
  }
}
