import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApresentacaoPage } from './apresentacao.page';

const routes: Routes = [
  {
    path: '',
    component: ApresentacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApresentacaoPageRoutingModule {}
