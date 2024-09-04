import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImpressaoExtratoPageRoutingModule } from './impressao-extrato-routing.module';

import { ImpressaoExtratoPage } from './impressao-extrato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImpressaoExtratoPageRoutingModule
  ],
  declarations: [ImpressaoExtratoPage]
})
export class ImpressaoExtratoPageModule {}
