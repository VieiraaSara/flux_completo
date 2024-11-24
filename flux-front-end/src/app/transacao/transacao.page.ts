import { Component, OnInit } from '@angular/core';
import { TransacaoService } from '../services/transacao.service';
import { PixService } from '../services/pix.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-transacao',
  templateUrl: './transacao.page.html',
  styleUrls: ['./transacao.page.scss'],
})
export class TransacaoPage implements OnInit {

  valor: number = 0;
  descricao: string = '';
  bancosFiltrados: any[] = [];
  selectedInstitutionEnvio: any = null;
  selectedInstitutionRecebimento: any = null;
  token: string | null = '';
  id_contaBancos: any;

  constructor(
    private transacaoService: TransacaoService,
    private pixService: PixService,
    private router: Router,
    public navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.carregarBancos();
  }

  carregarBancos() {
    if (this.token) {
      this.transacaoService.getContasFlux(this.token).then(contasFlux => {

        if (Array.isArray(contasFlux)) {
          console.log(contasFlux);


          this.bancosFiltrados = contasFlux.map(conta => {
            console.log('ID Conta Bancos:', conta.id_contaBancos);
            console.log('Conta:', conta.Contum);
            console.log('Banco Image:', conta.Contum.Banco.image);

           return{ id_contaBancos: conta.id_contaBancos,

            name: conta.Contum.Banco.name,
            image: conta.Contum.Banco.image,
            id_conta:conta.id_contaBancos,
            saldo: conta.saldo,
            tipo_conta: conta.tipo_conta,
            usuario_id: conta.usuario_id
          }});

        } else {
          console.error('A resposta da API não é um array:', contasFlux);

        }
      }).catch(error => {
        console.error('Erro ao carregar contas:', error);
      });
    }
  }
  decreaseValue() {
    if (this.valor > 0) this.valor--;
  }

  increaseValue() {
    this.valor++;
  }

  selecionarBancoEnvio(banco: any,id_banco:any,contaBancosID:any) {
    console.log(banco);
    console.log('BANCO ENVIAR',id_banco);
    // console.log('CONTA BANCOS',contaBancosID);
    this.selectedInstitutionEnvio = banco;
  }

  selecionarBancoRecebimento(banco: any,id_banco:any,contaBancosID:any) {
    console.log(banco);
    console.log('BANCO RECEBER',id_banco);
    // console.log('CONTA BANCOS',contaBancosID);


    this.selectedInstitutionRecebimento = banco;
  }



  enviarTransacao() {
    console.log('CHEGOU AS COIAS ');
    if (!this.selectedInstitutionEnvio || !this.selectedInstitutionRecebimento || this.valor <= 0) {
      console.error('Selecione os bancos e informe um valor válido');
      return;
    }

    const transacaoEnvio = {
      id_contaBancos:this.id_contaBancos,
      id_conta_bancaria_origem: this.selectedInstitutionEnvio.id_conta,
      id_conta_bancaria_destino:this.selectedInstitutionRecebimento.id_conta,
      usuario_id: this.selectedInstitutionEnvio.usuario_id,

      valor_transferencia: this.valor.toFixed(2),
      descricao:this.descricao

    };
console.log(transacaoEnvio);
    if (this.token) {
      this.transacaoService.fazerTransacao(this.token, transacaoEnvio.id_contaBancos, transacaoEnvio).subscribe(
        (response) => {
          console.log('Transação realizada com sucesso', response);
          this.router.navigate(['/tabs/home']);
        },
        (error) => {
          console.error('Erro ao realizar transação', error);
        }
      );
    }
  }
  voltar($event: MouseEvent) {
    this.navCtrl.navigateBack('/tabs/home');
  }
}
