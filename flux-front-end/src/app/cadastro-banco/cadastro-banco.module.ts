import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroBancoPageRoutingModule } from './cadastro-banco-routing.module';

import { CadastroBancoPage } from './cadastro-banco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroBancoPageRoutingModule
  ],
  declarations: [CadastroBancoPage]
})
export class CadastroBancoPageModule {}
