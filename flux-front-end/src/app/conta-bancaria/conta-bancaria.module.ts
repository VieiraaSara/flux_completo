import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContaBancariaPageRoutingModule } from './conta-bancaria-routing.module';

import { ContaBancariaPage } from './conta-bancaria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContaBancariaPageRoutingModule
  ],
  declarations: [ContaBancariaPage]
})
export class ContaBancariaPageModule {}
