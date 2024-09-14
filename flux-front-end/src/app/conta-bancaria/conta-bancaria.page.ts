import { Component, OnInit } from '@angular/core';
import { ContaBancariaService } from 'src/app/services/conta-bancaria.service';
import { AuthService } from 'src/app/services/auth.service'; 

interface Banco {
  id_banco:number;
  id: number;
  name: string;
  image: string;
  
}

interface Conta {
  fkBancoId: number;
  saldo: number;
  tipo_conta: string;
}



@Component({
  selector: 'app-conta-bancaria',
  templateUrl: './conta-bancaria.page.html',
  styleUrls: ['./conta-bancaria.page.scss']
})
export class ContaBancariaPage implements OnInit {
  valor: number = 0;
  tipoConta: string = ''; 
  selectedInstitution: number | null = null;
  bancos: Banco[] = [];
  token: string | null = null;

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

  increaseValue() {
    this.valor++;
  }

  decreaseValue() {
    if (this.valor > 0) {
      this.valor--;
    }
  }

  listarInstituicoes() {
    if (this.token) {
      this.contaBancariaService.getInstituicoes(this.token)
        .then((response: Banco[]) => {
          console.log('Resposta da API:', response); 
          this.bancos = response; 
        })
        .catch((err) => {
          console.error('Erro ao listar instituições:', err);
        });
    }
  }

  selecionarBanco(banco: Banco) {
    this.selectedInstitution = banco.id_banco;
    console.log(this.selectedInstitution)
  }

  cadastrarConta() {
    if (this.valor > 0 && this.tipoConta && this.selectedInstitution !== null && this.token) {
  
      
        const conta: Conta = {
          fkBancoId: this.selectedInstitution,
          saldo: this.valor,
          tipo_conta: this.tipoConta 
        };

        console.log(this.selectedInstitution)
        console.log(typeof this.tipoConta); 

        console.log('Dados da conta:', conta);

        this.contaBancariaService.cadastrarConta(this.token, conta)
          .then(() => {
            console.log('Conta cadastrada com sucesso!');
          })
          .catch((err: any) => {
            console.error('Erro ao cadastrar conta:', err);
          });
      } 
    } 
}