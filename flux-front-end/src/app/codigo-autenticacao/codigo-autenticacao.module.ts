import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoAutenticacaoPageRoutingModule } from './codigo-autenticacao-routing.module';

import { CodigoAutenticacaoPage } from './codigo-autenticacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoAutenticacaoPageRoutingModule
  ],
  declarations: [CodigoAutenticacaoPage]
})
export class CodigoAutenticacaoPageModule {}
