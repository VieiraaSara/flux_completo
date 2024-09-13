import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfigFluxPageRoutingModule } from './config-flux-routing.module';
import { ConfigFluxPage } from './config-flux.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigFluxPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ConfigFluxPage]
})
export class ConfigFluxPageModule {}
