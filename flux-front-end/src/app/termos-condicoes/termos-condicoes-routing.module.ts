import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermosCondicoesPage } from './termos-condicoes.page';

const routes: Routes = [
  {
    path: '',
    component: TermosCondicoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermosCondicoesPageRoutingModule {}
