import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImpressaoGeralPageRoutingModule } from './impressao-geral-routing.module';

import { ImpressaoGeralPage } from './impressao-geral.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImpressaoGeralPageRoutingModule
  ],
  declarations: [ImpressaoGeralPage]
})
export class ImpressaoGeralPageModule {}
