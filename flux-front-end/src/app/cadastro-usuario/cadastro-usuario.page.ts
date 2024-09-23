import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],

})

export class CadastroUsuarioPage implements OnInit {

  cadastroForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private navCtrl: NavController,
    private authService: AuthService,
    private toastController : ToastController
  ) { }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({

      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.maxLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.confirmacaoSenha });
  }

  confirmacaoSenha(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return senha === confirmPassword ? null : { notSame: true };
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


async cadastrar() {
  const formValues = this.cadastroForm.value;


  const cpfLimpo = formValues.cpf.replace(/\D/g, '');

  if (cpfLimpo.length !== 11) {
    this.presentToast('CPF inválido. Deve conter 11 dígitos.');
    return;
  }

  const user = {
    ...formValues,
    cpf: cpfLimpo

  };

  try {
    await this.loginService.cadastrar(user);
    this.presentToast('Conta Cadastrada com sucesso!');
    this.navCtrl.navigateRoot('/login');
  } catch (error) {
    this.presentToast('Erro ao cadastrar.');
    console.log(error);
  }
}
}
