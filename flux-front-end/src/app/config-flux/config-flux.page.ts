import { Component, NgModule, OnInit } from '@angular/core';
import { IonAlert, NavController } from '@ionic/angular';
import { FormBuilder,  FormGroup,  ReactiveFormsModule,  Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { ConfigFluxService } from '../services/config-flux.service';
import { UpdateUserService } from '../services/update-user.service';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AuthService } from '../services/auth.service';
import { DeleteUserService } from '../services/delete-user.service';

export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}
@Component({
  selector: 'app-config-flux',
  templateUrl: './config-flux.page.html',
  styleUrls: ['./config-flux.page.scss'],


})

export class ConfigFluxPage implements OnInit {
  informations: any[] = [];
  id?: number;

  user = {
    nome: '',
    email: '',
    cpf: '',
    password: '',
    securityQuestion: '',
    securityAnswer: '',
    emailPref: false,
    smsPref: false,
    idNumber: '',
    twoFactorStatus: '',
    securitySettings: '',
  };

  editarInformacoesForm!: FormGroup;
  constructor(
    private tran: ConfigFluxService,
    private formBuilder: FormBuilder,
    private updateAccountService: UpdateUserService,
    private authService: AuthService,
    private deleteUser: DeleteUserService,
    private navCtrl: NavController) {}

  ngOnInit() {

    this.decodeToken();
    const token = localStorage.getItem('token');

    if (token && this.id) {
      this.tran.listarUsuario(this.id, token).subscribe(
        (data) => {
          if (data) {
            // Atualize o form com os dados recebidos
            this.editarInformacoesForm.patchValue({
              nome: data.nome,
              email: data.email,
              cpf: data.cpf,
              senha: data.senha
            });

            this.informations = [{
              id: data.id_usuario,
              nome: data.nome,
              email: data.email,
              cpf: data.cpf
            }];
          } else {
            console.error('Dados inválidos retornados da API:', data);
          }
        },
        (error) => {
          console.error('Erro ao buscar dados da API', error);
        }
      );
    } else {
      console.error('Token não encontrado.');
    }

    this.editarInformacoesForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    })

  }

  decodeToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const tokenPayload: any = jwtDecode(token);
        if (tokenPayload && tokenPayload.id) {
          this.id = tokenPayload.id;
          return tokenPayload.id;
        } else {
          console.error('Payload do token inválido:', tokenPayload);
        }
      const userIdToken = tokenPayload.id;
        return userIdToken;
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    } else {
      console.error('Token não encontrado.');
    }
    return null;
  }

  toggleSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    const arrow = section?.previousElementSibling?.querySelector(
      '.arrow'
    ) as HTMLElement;

    if (section) {
      if (section.classList.contains('show')) {
        section.classList.remove('show');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
      } else {
        section.classList.add('show');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
      }
    }
  }

 async atualizarInformacoes() {
  const user = this.editarInformacoesForm.value;
  const token = localStorage.getItem('token');

  if (token && this.id) {
    try {
      const response: any = await this.updateAccountService.atualizarInformacoesUsuario(user, this.id, token);

      if (response) {
        alert('Usuário atualizado com sucesso: ' + JSON.stringify(response));

        const newToken = response.token;
        if (newToken) {
          localStorage.setItem("token", newToken);
        }

        this.navCtrl.navigateRoot('/home', { replaceUrl: true });
      } else {
        console.error('Resposta não contém os dados esperados:', response);
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  }
}
async deleteUserById(){
  const userId = this.decodeToken();
  const tkn = localStorage.getItem('token');
  if (userId && tkn) {
    try {
      await this.deleteUser.deletarUsuario(userId, tkn).toPromise();
      this.authService.deleteToken();
      this.navCtrl.navigateRoot('/cadastro-usuario', { replaceUrl: true });
    } catch (error) {
      console.error('Erro ao excluir usuário', error);
    }
  } else {
    console.error('ID do usuário ou token não encontrado');
  }



}

public alertButtonBack = [
  {
    text: 'Cancelar',
    role: 'cancel',
    cssClass: 'alert-button-cancel',
    handler: () => {

    },
  },
  {
    text: 'Sair',
    role: 'confirm',
    cssClass: 'alert-button-confirm',
    handler: () => {
      this.authService.signOutExternal();
      this.navCtrl.navigateRoot('/login', { replaceUrl: true });
    },
  },
];

public alertButtonDeleteAccount = [
  {
    text: 'Cancelar',
    role: 'cancel',
    cssClass: 'alert-button-cancel',
    handler: () => {
      this.navCtrl.navigateRoot('/config-flux', { replaceUrl: true });
    },
  },
  {
    text: 'Excluir conta',
    role: 'confirm',
    cssClass: 'alert-button-confirm',
    handler: () => {
      this.deleteUserById();
    },
  },
];





}

