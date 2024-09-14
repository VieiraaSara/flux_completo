import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private refreshInProgress = false; // Adiciona um flag para evitar múltiplos refreshes
  private requestsQueue: Array<() => void> = []; // Fila de requisições para serem processadas após o refresh

  constructor(
    private injector: Injector,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = localStorage.getItem('token');

    // Adiciona o token ao header da requisição
    let clonedReq = req;
    if (token) {
      clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    // Retornar o fluxo de requisição corretamente
    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {

          if (this.refreshInProgress) {
            // Adiciona a requisição à fila
            return new Observable(observer => {
              this.requestsQueue.push(() => {
                next.handle(req.clone({
                  headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
                })).subscribe(observer);
              });
            });
          }

          this.refreshInProgress = true;
          const loginService = this.injector.get(AuthService);

          // Tenta fazer o refresh do token
          return loginService.refreshToken().pipe(
            switchMap((newToken: any) => {
              if (newToken && newToken.token) {

                localStorage.setItem('token', newToken.token);


                this.requestsQueue.forEach(callback => callback());
                this.requestsQueue = [];


                return next.handle(req.clone({
                  headers: req.headers.set('Authorization', `Bearer ${newToken.token}`)
                }));
              }


              this.router.navigateByUrl('/login');
              return throwError(() => new Error('Não foi possível atualizar o token.'));
            }),
            catchError(() => {

              this.router.navigateByUrl('/login');
              this.snackBar.open('Sessão expirada. Faça login novamente.', 'Fechar');
              this.refreshInProgress = false;
              return throwError(() => new Error('Sessão expirada.'));
            })
          );
        }


        return throwError(() => error);
      })
    );
  }
}
