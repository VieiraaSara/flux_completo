import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusBancosPageRoutingModule } from './meus-bancos-routing.module';

import { MeusBancosPage } from './meus-bancos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusBancosPageRoutingModule
  ],
  declarations: [MeusBancosPage]
})
export class MeusBancosPageModule {}
