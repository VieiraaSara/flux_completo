import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigoAutenticacaoPage } from './codigo-autenticacao.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoAutenticacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoAutenticacaoPageRoutingModule {}
