import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

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

  constructor(private authService:AuthService,
     private loginService: LoginService,
      private navCtrl: NavController,
    private toastController: ToastController
    ) {}


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000, 
      position: 'top', // Posição do toast (top, bottom, middle)
      cssClass: 'toast-container'
    });
    toast.present();
  }
  


  async login() {
    try {
      const response = await this.authService.login(this.credentials).toPromise();
      const token = response?.token;
      if (token) {
        localStorage.setItem('token', token);
        this.presentToast('Login correto.Bem-vindo!');
        this.navCtrl.navigateRoot('tabs/home');
      } else {
        alert('Token não recebido');
      }
    } catch (error) {
      alert('Erro ao fazer login:');
    }
  }

  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}
