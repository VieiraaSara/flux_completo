import { Component, OnInit } from '@angular/core';
import { TransacaoService } from '../services/transacao.service';
import { NavController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notifications: any[] = [];
  nome: string = '';

  constructor(
    private tran: TransacaoService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.decodeToken();

    const token = localStorage.getItem('token');
    if (token) {
      this.tran.getHome(token).subscribe(
        async (data) => {
          if (data && Array.isArray(data)) {
            this.notifications = data.map((item: any) => ({
              title: item.descricao,
              subtitle: `Saldo: ${item.valor}, Banco: ${item.nome_banco}`,
              logoUrl: 'assets/image/bank-logo.png',
              detailsVisible: false,
            }));
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
  }

  decodeToken() {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const tokenPayload: any = jwtDecode(token);

        if (tokenPayload && tokenPayload.nome) {
          this.nome = tokenPayload.nome;
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }

  toggleDetails(notification: any) {
    notification.detailsVisible = !notification.detailsVisible;
  }
}
