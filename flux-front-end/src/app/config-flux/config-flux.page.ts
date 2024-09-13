import { Component, NgModule, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder,  FormGroup,  ReactiveFormsModule,  Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { ConfigFluxService } from '../services/config-flux.service';
import { UpdateUserService } from '../services/update-user.service';
import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, computed, signal} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';

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

  decodeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const tokenPayload: any = jwtDecode(token);
        if (tokenPayload && tokenPayload.id) {
          this.id = tokenPayload.id;
        } else {
          console.error('Payload do token inválido:', tokenPayload);
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    } else {
      console.error('Token não encontrado.');
    }
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
readonly task = signal<Task>({
  name: 'Parent task',
  completed: false,
  subtasks: [
    {name: 'Child task 1', completed: false},
    {name: 'Child task 2', completed: false},
    {name: 'Child task 3', completed: false},
  ],
});

readonly partiallyComplete = computed(() => {
  const task = this.task();
  if (!task.subtasks) {
    return false;
  }
  return task.subtasks.some(t => t.completed) && !task.subtasks.every(t => t.completed);
});

update(completed: boolean, index?: number) {
  this.task.update(task => {
    if (index === undefined) {
      task.completed = completed;
      task.subtasks?.forEach(t => (t.completed = completed));
    } else {
      task.subtasks![index].completed = completed;
      task.completed = task.subtasks?.every(t => t.completed) ?? true;
    }
    return {...task};
  });
}


}

