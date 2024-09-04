import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmacaoAutenticacaoPage } from './confirmacao-autenticacao.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmacaoAutenticacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmacaoAutenticacaoPageRoutingModule {}
