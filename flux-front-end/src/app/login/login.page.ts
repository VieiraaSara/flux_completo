import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {

  visible:boolean = true;
  changetype:boolean =true;

  credentials = {
    email: '',
    senha: ''
  };

  constructor(private loginService: LoginService, private navCtrl: NavController) {}

  async login() {
    try {
      const token = await this.loginService.login(this.credentials);
      localStorage.setItem('token', token);
      this.navCtrl.navigateRoot('/home');
    } catch (error) {
      alert('Erro ao fazer login: ');
    }
  }

  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

}
