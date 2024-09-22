import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { IonicInputMaskModule } from '@thiagoprz/ionic-input-mask';
import { IonicModule } from '@ionic/angular';

import { CadastroUsuarioPageRoutingModule } from './cadastro-usuario-routing.module';

import { CadastroUsuarioPage } from './cadastro-usuario.page';
import { MessageService } from 'primeng/api';



@NgModule({
  providers:[MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,  
    IonicModule,
    CadastroUsuarioPageRoutingModule,
    IonicInputMaskModule
  ],
  declarations: [CadastroUsuarioPage]
})
export class CadastroUsuarioPageModule {}
