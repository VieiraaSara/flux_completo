import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaisBancosPageRoutingModule } from './mais-bancos-routing.module';

import { MaisBancosPage } from './mais-bancos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaisBancosPageRoutingModule
  ],
  declarations: [MaisBancosPage]
})
export class MaisBancosPageModule {}
