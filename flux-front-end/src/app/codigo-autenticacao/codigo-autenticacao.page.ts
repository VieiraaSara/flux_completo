import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-codigo-autenticacao',
  templateUrl: './codigo-autenticacao.page.html',
  styleUrls: ['./codigo-autenticacao.page.scss'],
})
export class CodigoAutenticacaoPage implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
    
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
    // Aqui você pode chamar um serviço para reenviar o código
  }
}
