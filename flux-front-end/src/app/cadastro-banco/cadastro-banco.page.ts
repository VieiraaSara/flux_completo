import { Component, OnInit } from '@angular/core';
import { ContaBancariaService } from '../services/conta-bancaria.service';
import { AuthService } from '../services/auth.service';
import { PixService } from '../services/pix.service';

interface Banco {
  id_banco: number;
  name: string;
  image: string;
}

interface Conta {
  fkBancoId: number;
  usuario_id: number;
  id_conta: number;
  saldo: string;
  tipo_conta: string;
  Banco: Banco; 
}

interface Pix{
  key_type: string
  key:string
  conta_bancaria_id: number
  
  
}
@Component({
  selector: 'app-cadastro-banco',
  templateUrl: './cadastro-banco.page.html',
  styleUrls: ['./cadastro-banco.page.scss'],
})
export class CadastroBancoPage implements OnInit {
  key: string = ''; 
  key_type: string = ''; 
  selectedInstitution: number | null = null;
  contas: Conta[] = [];  // Mudança para "contas", porque o dado principal é Conta, não Banco
  token: string | null = null;

  constructor(
    private authService: AuthService,
    private pixService: PixService
  ) {}

  ngOnInit() {
    this.token = this.authService.getToken();  
    if (this.token) {
      this.listarContasBancarias();
    } else {
      console.error('Token não encontrado.');
    }
  }

  listarContasBancarias() {
    if (this.token) {
      this.pixService.getContaBancaria(this.token)
        .then((response: Conta[]) => {  
          console.log('Resposta da API:', response);
          this.contas = response;  // Agora você salva as contas
        })
        .catch((err) => {
          console.error('Erro ao listar contas bancárias:', err);
        });
    }
  }

  selecionarBanco(conta: Conta) {
    this.selectedInstitution = conta.id_conta;
    console.log(this.selectedInstitution);
  }

  

  cadastrarPix() {
    if (this.key && this.key_type && this.selectedInstitution !== null && this.token) {
      const pix: Pix = {
        key_type: this.key_type,
        key: this.key,
        conta_bancaria_id: this.selectedInstitution
        
        
      };

      console.log(this.selectedInstitution);
      console.log(this.key_type); 
      console.log(this.key);
      console.log('Dados do pix:', pix);

      this.pixService.cadastrarPix(this.token, pix)
        .then(() => {
          console.log('Pix cadastrado com sucesso!');
        })
        .catch((err: any) => {
          console.error('Erro ao cadastrar conta:', err);
        });
    }
  }
}
