import { Component, OnInit } from '@angular/core';
import { ContaBancariaService } from 'src/app/services/conta-bancaria.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IonicSlides } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
interface Banco {
  id_banco: number;
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

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 3,
    loop: true,
  };


  // No construtor, adicione o ActivatedRoute
  constructor(
    private contaBancariaService: ContaBancariaService,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router,
    private cdr: ChangeDetectorRef,
   public navCtrl: NavController,
    private route: ActivatedRoute // Adicionado ActivatedRoute
  ) { }

  ngOnInit() {
    this.token = this.authService.getToken();
    if (this.token) {
      this.listarInstituicoes();
    } else {
      console.error('Token não encontrado.');
    }


    this.route.paramMap.subscribe(params => {
      const bancoId = params.get('id');
      if (bancoId) {
        this.selectedInstitution = +bancoId;
        console.log('Banco selecionado via URL:', this.selectedInstitution);
      }
    });
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
    this.cdr.detectChanges()
    console.log(this.selectedInstitution)
  }

  get bancosFiltrados() {
    return this.bancos.filter(banco => ['Sicredi', 'Banco do Brasil', 'Santander', 'Bradesco', 'Itaú', 'Sicoob', 'Banco Inter', 'Nu Pagamentos S.A.'].includes(banco.name));
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: 'bottom', // Posição do toast (top, bottom, middle)
      cssClass: 'toast-container'
    });
    toast.present();
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
          this.presentToast('Conta Cadastrada com sucesso!');
          console.log('Conta Bancária cadastrada com sucesso!');
          this.router.navigate(['/cadastro-banco']);
        })
        .catch((err: any) => {
          console.error('Erro ao cadastrar conta:', err);
        });
    }
  }

  voltar($event: MouseEvent) {
    this.navCtrl.navigateBack('/tabs/home');
  }
}
