import { Component, HostListener, OnInit } from '@angular/core';
import { CarteiraService } from '../services/carteira.service';
import { FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.page.html',
  styleUrls: ['./carteira.page.scss'],
})
export class CarteiraPage implements OnInit {
  carteira: any[] = [];
  saldoTotalGeral: any[] = [];
  valor: any;
  porcentagem: any;
  descricao:any;
  nome_banco:any;
  id: any;
  image: any;
  condicao: boolean = true;
  constructor(
    private tran: CarteiraService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.decodeToken();

    const token = localStorage.getItem('token');
    if (token) {
      this.tran.getHome(token).subscribe(
        async (data) => {
          if (data && data.totalGeral && Array.isArray(data.resultPorcentAndQuery)) {
            this.saldoTotalGeral = data.totalGeral;

            this.carteira = data.resultPorcentAndQuery.map((item: any) => ({
              saldoTotalGeral: item.saldoTotalGeral,
              porcentagem: item.porcentagem,
              descricao: item.descricao,
              nome_banco: item.nome_banco,
              valor: item.valor,
              imageBank:item.image,
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
    console.log(this.saldoTotalGeral);
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const notifications = document.querySelectorAll('.container-global');

    notifications.forEach((notification: Element) => {
      const distanciaDoTopo = notification.getBoundingClientRect().top;

      if (distanciaDoTopo < window.innerHeight - 50) {
        notification.classList.add('scroll-smooth');
      }
    });

  }

  decodeToken() {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const tokenPayload: any = jwtDecode(token);

        if (tokenPayload && tokenPayload.id) {
          this.id = tokenPayload.id;
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }
  toggleDetails(carteira: any) {
    carteira.detailsVisible = !carteira.detailsVisible;
  }
}
