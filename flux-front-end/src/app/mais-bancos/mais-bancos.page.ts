import { Component, OnInit } from '@angular/core';
import { ContaBancariaService } from '../services/conta-bancaria.service';
import { AuthService } from '../services/auth.service';

interface Banco {
  id_banco: number;
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-mais-bancos',
  templateUrl: './mais-bancos.page.html',
  styleUrls: ['./mais-bancos.page.scss'],
})
export class MaisBancosPage implements OnInit {
  valor: number = 0;
  tipoConta: string = '';
  selectedInstitution: number | null = null;
  bancos: Banco[] = [];
  filteredBancos: Banco[] = [];
  token: string | null = null;
  searchQuery: string = '';

  constructor(
    private contaBancariaService: ContaBancariaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.token = this.authService.getToken();
    if (this.token) {
      this.listarInstituicoes();
    } else {
      console.error('Token não encontrado.');
    }
  }

  selecionarBanco(banco: Banco) {
    this.selectedInstitution = banco.id_banco;
  }

  listarInstituicoes() {
    if (this.token) {
      this.contaBancariaService.getInstituicoes(this.token)
        .then((response: Banco[]) => {
          console.log('Resposta da API:', response);
          this.bancos = response || [];
          this.filteredBancos = this.bancos; 
        })
        .catch((err) => {
          console.error('Erro ao listar instituições:', err);
        });
    }
  }

  onSearchChange() {
    this.filteredBancos = this.bancos.filter(banco =>
      banco.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
