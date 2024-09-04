import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImpressaoBancoPageRoutingModule } from './impressao-banco-routing.module';

import { ImpressaoBancoPage } from './impressao-banco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImpressaoBancoPageRoutingModule
  ],
  declarations: [ImpressaoBancoPage]
})
export class ImpressaoBancoPageModule {}
