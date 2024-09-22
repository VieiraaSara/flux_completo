import { Component, OnInit } from '@angular/core';
import { TransacaoService } from '../services/transacao.service';
import { PixService } from '../services/pix.service';
import { Router } from '@angular/router';

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

  constructor(
    private transacaoService: TransacaoService,
    private pixService: PixService,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.carregarBancos();
  }

  carregarBancos() {
    if (this.token) {
      this.pixService.getContaBancaria(this.token).then(contas => {
        this.bancosFiltrados = contas.map(conta => ({
          id_banco: conta.fkBancoId,
          name: conta.Banco.name,
          image: conta.Banco.image,
          id_conta: conta.id_conta,
          saldo: conta.saldo,
          tipo_conta: conta.tipo_conta,
          usuario_id: conta.usuario_id
        }));
      });
    }
  }

  decreaseValue() {
    if (this.valor > 0) this.valor--;
  }

  increaseValue() {
    this.valor++;
  }

  selecionarBancoEnvio(banco: any) {
    this.selectedInstitutionEnvio = banco;
  }

  selecionarBancoRecebimento(banco: any) {
    this.selectedInstitutionRecebimento = banco;
  }

  enviarTransacao() {
    if (!this.selectedInstitutionEnvio || !this.selectedInstitutionRecebimento || this.valor <= 0) {
      console.error('Selecione os bancos e informe um valor válido');
      return;
    }

    const transacaoEnvio = {
      id_conta: this.selectedInstitutionEnvio.id_conta,
      usuario_id: this.selectedInstitutionEnvio.usuario_id,
      banco_id: this.selectedInstitutionEnvio.id_banco,
      saldo: this.valor.toFixed(2),
      tipo_conta: this.selectedInstitutionEnvio.tipo_conta
    };

    if (this.token) {
      this.transacaoService.fazerTransacao(this.token, transacaoEnvio.id_conta, transacaoEnvio).subscribe(
        (response) => {
          console.log('Transação realizada com sucesso', response);
          this.router.navigate(['/confirmacao-transacao']);
        },
        (error) => {
          console.error('Erro ao realizar transação', error);
        }
      );
    }
  }
}
