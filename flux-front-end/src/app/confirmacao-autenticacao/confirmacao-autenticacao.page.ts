import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PixService } from '../services/pix.service';

@Component({
  selector: 'app-confirmacao-autenticacao',
  templateUrl: './confirmacao-autenticacao.page.html',
  styleUrls: ['./confirmacao-autenticacao.page.scss'],
})
export class ConfirmacaoAutenticacaoPage implements OnInit {

  data: any = {};

  constructor(private route: ActivatedRoute, public navCtrl: NavController,
    private pixService: PixService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params['data']) {
        try {
          const parsedData = JSON.parse(params['data']);


          if (Array.isArray(parsedData)) {
            this.data = parsedData;
          } else {
            this.data = [parsedData];
          }

          console.log('Dados verificação:', this.data);
        } catch (error) {
          console.error('Erro ao parsear os dados:', error);
        }
      }
    });
  }
confirmarCodigo(data: any){
console.log(data);
console.log(data.code);
console.log(data.token);
console.log(data.id);
this.pixService.verifyCode(data.id,data.token, data.code).subscribe(response => {

  this.navCtrl.navigateForward('/tabs/meus-bancos'

  );

}, error => {
  console.error('Erro ao vericicar codigo:', error);
});


}
}
