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
  filteredChavesPix: any[] = [];
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
          this.filteredChavesPix = response; 
        },
        (error) => {
          console.error('Erro ao carregar chaves Pix:', error);
        }
      );
    }
  }

  filtrarChaves(event: Event) {
    const valorPesquisa = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredChavesPix = this.chavesPix.filter(chave => 
      chave.Pix.key.toLowerCase().includes(valorPesquisa)
    );
  
   
    this.filteredChavesPix.sort((a, b) => 
      a.Pix.key.toLowerCase().indexOf(valorPesquisa) === 0 ? -1 : 1
    );
  }

  filtrarPorStatusPendente() {
    this.filteredChavesPix = this.chavesPix.filter(chave => chave.Pix.status === 'VALIDANDO');
  }

  filtrarPorMaiorSaldo() {
    this.filteredChavesPix = [...this.chavesPix]
      .filter(chave => chave.Pix.status !== 'VALIDANDO')
      .sort((a, b) => b.Contum.saldo - a.Contum.saldo);
  }
  
  filtrarPorMenorSaldo() {
    this.filteredChavesPix = [...this.chavesPix]
      .filter(chave => chave.Pix.status !== 'VALIDANDO')
      .sort((a, b) => a.Contum.saldo - b.Contum.saldo);
  }
  
}
