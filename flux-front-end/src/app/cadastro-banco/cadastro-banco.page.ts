import { Component, OnInit } from '@angular/core';
import { ContaBancariaService } from '../services/conta-bancaria.service';
import { AuthService } from '../services/auth.service';
import { PixService } from '../services/pix.service';


interface Conta {
  fkBancoId: number;
  saldo: number;
  tipo_conta: string;
}



@Component({
  selector: 'app-cadastro-banco',
  templateUrl: './cadastro-banco.page.html',
  styleUrls: ['./cadastro-banco.page.scss'],
})
export class CadastroBancoPage implements OnInit {
  chavePix: string = ''; 
  tipoConta: string = ''; 
  selectedInstitution: number | null = null;
  contas: Conta[] = [];
  token: string | null = null;

  constructor(
    private contaBancariaService: ContaBancariaService,
    private authService: AuthService ,
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
          this.contas = response; 
        })
        .catch((err) => {
          console.error('Erro ao listar instituições:', err);
        });
    }
  }

  selecionarConta(conta: Conta) {
    // this.selectedInstitution = conta.id_conta;
    console.log(this.selectedInstitution)
  }

  cadastrarConta() {
    if (this.chavePix && this.tipoConta && this.selectedInstitution !== null && this.token) {
  
      
        // const pix: Pix = {
          // chavepix: this.chavePix,
          // fkContaId: this.selectedInstitution,
          // tipo_pix: this.tipoPix
        // };

        console.log(this.selectedInstitution)
        console.log(typeof this.tipoConta); 

        // console.log('Dados do pix:', pix);

        
        // this.pixService.cadastrarPix(this.token, pix)
          // .then(() => {
            // console.log('Pix cadastrado com sucesso!');
        // })
          // .catch((err: any) => {
            // console.error('Erro ao cadastrar conta:', err);
          // });
      } 
    } 
}