import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-termos-condicoes',
  templateUrl: './termos-condicoes.page.html',
  styleUrls: ['./termos-condicoes.page.scss'],
})
export class TermosCondicoesPage implements OnInit {

  constructor(public navCtrl:NavController) { }

  ngOnInit() {
  }

  voltar($event: MouseEvent) {
    this.navCtrl.navigateBack('/cadastro-usuario');
  }

}
