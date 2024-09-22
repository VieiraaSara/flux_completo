import { Component, OnInit } from '@angular/core';
import { PixService } from '../services/pix.service';
import { NavController } from '@ionic/angular';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-meus-bancos',
  templateUrl: './meus-bancos.page.html',
  styleUrls: ['./meus-bancos.page.scss'],
})
export class MeusBancosPage implements OnInit {
  chavesPix: any[] = [];
  token: string = '';

  constructor(
    private pixService: PixService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.decodeToken();
    this.carregarChavesPix();
  }

  decodeToken() {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const tokenPayload: any = jwtDecode(token);
        if (tokenPayload && tokenPayload.id) {
          this.token = token;
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }

  carregarChavesPix() {
    if (this.token) {
      this.pixService.getChavePix(this.token).subscribe(
        (response: any) => {
          this.chavesPix = response;
        },
        (error) => {
          console.error('Erro ao carregar chaves Pix:', error);
        }
      );
    }
  }
}
