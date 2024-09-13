import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  credentials = {
    email: '',
    senha: ''
  };

  constructor(private authService:AuthService, private loginService: LoginService, private navCtrl: NavController) {}

  async login() {
    try {
      alert(this.credentials.email);
      alert(this.credentials.senha);
      const token =await this.authService.login(this.credentials);
      if(!localStorage.getItem('token')){

        localStorage.setItem('token', token);

      }else{
      localStorage.getItem('token');
      }
      this.navCtrl.navigateRoot('/home');
    } catch (error) {
      alert('Erro ao fazer login: ');
    }
  }
}
