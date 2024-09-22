import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TransacaoService } from '../services/transacao.service';
import { jwtDecode } from 'jwt-decode';
import { PixService } from '../services/pix.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-codigo-autenticacao',
  templateUrl: './codigo-autenticacao.page.html',
  styleUrls: ['./codigo-autenticacao.page.scss'],
})
export class CodigoAutenticacaoPage implements OnInit, AfterViewInit {

  email: string = '';
  token: string | null = null;
  id: string = '';
  code: string = '';

  constructor(
    private tran: TransacaoService,
    private pixService: PixService,
    private router : Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.decodeToken();

    const storedIdPix = localStorage.getItem('id_pix');
    if (storedIdPix) {
      this.id = storedIdPix;
      console.log('ID do Pix recuperado:', this.id);
    } else {
      console.warn('ID do Pix não encontrado no localStorage.');
    }


  }

  decodeToken() {
    const token = localStorage.getItem('token');
    this.token = token;

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
    console.log('ngAfterViewInit chamado');
    this.setupCodeInputHandler();
  }


  // concatena os inputs para pegar o código
  getCodeFromInputs(): string {
    const inputs = document.querySelectorAll('.input-codigo input') as NodeListOf<HTMLInputElement>;
    let code = '';
    console.log(inputs)
    inputs.forEach((input) => {
      code += input.value;
    });
    return code;

  }


  setupCodeInputHandler() {
    const inputs = document.querySelectorAll('.input-codigo input') as NodeListOf<HTMLInputElement>;

    inputs.forEach((input, index) => {
      input.addEventListener('input', (event) => {
        const target = event.target as HTMLInputElement;


        if (target.value.length === 1) {
          if (index < inputs.length - 1) {
            (inputs[index + 1] as HTMLElement).focus();
          } else {
            const code = this.getCodeFromInputs();
            if (code.length === inputs.length) {
              this.verifyCode(new Event('submit'));
            }
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

  verifyCode(event: Event) {
    event.preventDefault();
    console.log('verify code chamado');
    const code = this.getCodeFromInputs();

    if (code && this.token && this.id !== null) {
      const id = this.id;
      const token = this.token as string;
      const code = this.getCodeFromInputs();
      console.log(code);
      console.log(token);
      console.log(id);
      console.log('CODE JSON', code);
      // Primeira verificação
      this.pixService.verifyCode(id,token, code).subscribe(response => {
        const dataToSend = {
          id: id,
          token: token,
          code: code
        };
        this.navCtrl.navigateForward('/confirmacao-autenticacao', {

          queryParams: {data: JSON.stringify(dataToSend)}
        });

      }, error => {
        console.error('Erro ao vericicar codigo:', error);
      });




    } else {
      console.warn('Código, token ou id_pix ausente.');
    }
  }


  resendCode() {
    console.log('Reenviando o código...');
  }
}
