import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TransacaoService } from '../services/transacao.service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-codigo-autenticacao',
  templateUrl: './codigo-autenticacao.page.html',
  styleUrls: ['./codigo-autenticacao.page.scss'],
})
export class CodigoAutenticacaoPage implements OnInit, AfterViewInit {

  email: string = '';

  constructor(
    private tran: TransacaoService
  ) { }

  ngOnInit() {

    this.decodeToken();

    const token = localStorage.getItem('token');
    
    
  }

  decodeToken() {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const tokenPayload: any = jwtDecode(token);

        if (tokenPayload && tokenPayload.email) {
          this.email = tokenPayload.email;
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }

  ngAfterViewInit() {
    this.setupCodeInputHandler();
  }

  setupCodeInputHandler() {
    const inputs = document.querySelectorAll('.input-codigo input') as NodeListOf<HTMLInputElement>;
    const form = document.getElementById('codigo-form') as HTMLFormElement | null;

    if (form) {
      inputs.forEach((input, index) => {
        input.addEventListener('input', (event) => {
          const target = event.target as HTMLInputElement;
          if (target.value.length === 1) {
            if (index < inputs.length - 1) {
              (inputs[index + 1] as HTMLElement).focus(); 
            } else {
              form.submit(); 
            }
          }
        });

        input.addEventListener('keydown', (event) => {
          const keyboardEvent = event as KeyboardEvent;
          if (keyboardEvent.key === 'Backspace' && input.value === '' && index > 0) {
            (inputs[index - 1] as HTMLElement).focus(); 
          }
        });
      });
    }
  }

  resendCode() {
    console.log('Reenviando o código...');
    
  }
}
