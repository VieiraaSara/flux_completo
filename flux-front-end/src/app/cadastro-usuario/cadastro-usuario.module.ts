import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 

import { IonicModule } from '@ionic/angular';

import { CadastroUsuarioPageRoutingModule } from './cadastro-usuario-routing.module';

import { CadastroUsuarioPage } from './cadastro-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,  
    IonicModule,
    CadastroUsuarioPageRoutingModule
  ],
  declarations: [CadastroUsuarioPage]
})
export class CadastroUsuarioPageModule {}
