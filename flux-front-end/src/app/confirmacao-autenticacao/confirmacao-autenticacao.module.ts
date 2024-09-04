import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmacaoAutenticacaoPageRoutingModule } from './confirmacao-autenticacao-routing.module';

import { ConfirmacaoAutenticacaoPage } from './confirmacao-autenticacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmacaoAutenticacaoPageRoutingModule
  ],
  declarations: [ConfirmacaoAutenticacaoPage]
})
export class ConfirmacaoAutenticacaoPageModule {}
