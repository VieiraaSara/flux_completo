import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApresentacaoPageRoutingModule } from './apresentacao-routing.module';

import { ApresentacaoPage } from './apresentacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApresentacaoPageRoutingModule
  ],
  declarations: [ApresentacaoPage]
})
export class ApresentacaoPageModule {}
