import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
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
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({

      nome: ['', [Validators.required, Validators.minLength(3)]],
<<<<<<< HEAD
      cpf: ['', [Validators.required, Validators.maxLength(14)]], 
=======
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
>>>>>>> 66b3ce12898191929b0eea5ce3e1939e6551f522
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

<<<<<<< HEAD
 
async cadastrar() {
  const formValues = this.cadastroForm.value;
  

  const cpfLimpo = formValues.cpf.replace(/\D/g, ''); 
  
=======
  async cadastrar() {

  const formValues = this.cadastroForm.value;

  // Remove os pontos e traços do CPF antes de enviar
  const cpfLimpo = formValues.cpf.replace(/\D/g, ''); // Remove tudo que não for número


>>>>>>> 66b3ce12898191929b0eea5ce3e1939e6551f522
  if (cpfLimpo.length !== 11) {
    alert('CPF inválido. Deve conter 11 dígitos.');
    return;
  }

  const user = {
    ...formValues,
<<<<<<< HEAD
    cpf: cpfLimpo 
=======
    cpf: cpfLimpo // Substitui o CPF pela versão sem separadores
>>>>>>> 66b3ce12898191929b0eea5ce3e1939e6551f522
  };

  try {
    await this.loginService.cadastrar(user);
    alert('Cadastro realizado com sucesso!');
    this.navCtrl.navigateRoot('/login');
  } catch (error) {
    alert('Erro ao cadastrar.');
    console.log(error);
  }
}
}
