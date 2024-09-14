import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { TransacaoService } from '../services/transacao.service';
import { NavController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import {jwtDecode} from 'jwt-decode';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgIfContext } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notifications: any[] = [];

  nome: string = '';
i: any;



  constructor(
    private tran: TransacaoService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,

  ) {}

  ngOnInit() {
    this.decodeToken();
    this.loadNotifications();

    const token = localStorage.getItem('token');
    if (token) {
      this.tran.getHome(token).subscribe(
        async (data) => {
          this.notifications = [];
          if (data && Array.isArray(data)) {
            this.notifications = data.map((item: any) => ({
              title: item.descricao,
              subtitle: `Saldo: ${item.valor}, Banco: ${item.nome_banco}`,
              logoUrl: item.image,
              nome:item.nome,
              detailsVisible: false,
            }));

          } else if(data){


            this.notifications.push({

              subtitle: data.message,
              nome: data.data
            });



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

 async decodeToken() {
    const token =  localStorage.getItem('token');

    if (token) {
      try {
        const tokenPayload: any = jwtDecode(token);

        if (tokenPayload && tokenPayload.nome) {
          this.nome = tokenPayload.nome;
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }else{

    }
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const notifications = document.querySelectorAll('.notification');

    notifications.forEach((notification: Element) => {
      const distanciaDoTopo = notification.getBoundingClientRect().top;

      if (distanciaDoTopo < window.innerHeight - 50) {
        notification.classList.add('scroll-smooth');
      }
    });

  }
  toggleDetails(notification: any) {
    notification.detailsVisible = !notification.detailsVisible;
  }
  loadNotifications() {
    const token = localStorage.getItem('token');
    if (token) {
      this.tran.getHome(token).subscribe(
        (data) => {
          if (data && Array.isArray(data)) {
            this.notifications = data.map((item: any) => ({
              title: item.descricao,
              subtitle: `Saldo: ${item.valor}, Banco: ${item.nome_banco}`,
              logoUrl: item.image,
              nome: item.nome,
              detailsVisible: false,
            }));
          } else {

            this.notifications.push({

              subtitle: data.message,
              nome: data.data
            });
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
}
