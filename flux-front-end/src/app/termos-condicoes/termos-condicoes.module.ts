import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermosCondicoesPageRoutingModule } from './termos-condicoes-routing.module';

import { TermosCondicoesPage } from './termos-condicoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermosCondicoesPageRoutingModule
  ],
  declarations: [TermosCondicoesPage]
})
export class TermosCondicoesPageModule {}
