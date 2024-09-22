import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TransacaoService } from '../services/transacao.service';
import { PixService } from '../services/pix.service';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { jwtDecode } from 'jwt-decode'; // Corrigindo o import do jwt-decode

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
  key: string = '';
  constructor(
    private tran: TransacaoService,
    private pixService: PixService,
    private router : Router,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Decodifica o token e extrai informações do payload
    this.decodeToken();
  
    // Recupera o ID do Pix armazenado no localStorage
    const storedIdPix = localStorage.getItem('id_pix');
    if (storedIdPix) {
      this.id = storedIdPix;
      console.log('ID do Pix recuperado:', this.id);
    } else {
      console.warn('ID do Pix não encontrado no localStorage.');
    }
  
    // Recuperar o token armazenado no localStorage
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token; // Armazena o token na variável da instância
  
      // Chama o serviço Pix para buscar a chave, usando this.token
      this.pixService.getChavePix(this.token).subscribe(
        response => {
          this.key = response.key;  // Atribui a chave recebida à variável 'key'
          console.log('Chave Pix recebida:', this.key);
        },
        error => {
          console.error('Erro ao buscar chave Pix:', error);
          // Aqui você pode exibir uma mensagem de erro, se necessário
        }
      );
    } else {
      console.warn('Token não encontrado no localStorage.');
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000, 
      position: 'bottom', // Posição do toast (top, bottom, middle)
      cssClass: 'toast-container'
    });
    toast.present();
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

      this.pixService.verifyCode(id, token, code).subscribe(response => {
        const dataToSend = { id, token, code };
        this.presentToast('Código correto!');
        this.navCtrl.navigateForward('/confirmacao-autenticacao', {
          queryParams: { data: JSON.stringify(dataToSend) }
        });
      }, error => {
        console.error('Erro ao verificar código:', error);
      });
    } else {
      console.warn('Código, token ou id_pix ausente.');
    }
  }

  // Implementação do método resendCode
  resendCode() {
    if (this.token && this.id) {
      console.log('Reenviando o código...');

      this.pixService.resendCode(this.id, this.token, this.code).subscribe(response => {
        console.log('Código reenviado com sucesso:', response);
        
      }, error => {
        console.error('Erro ao reenviar o código:', error);
        // Aqui você pode exibir uma mensagem de erro para o usuário
      });
    } else {
      console.warn('Token ou ID ausente. Não foi possível reenviar o código.');
    }
  }
}
