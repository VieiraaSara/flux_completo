import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImpressaoExtratoPage } from './impressao-extrato.page';

const routes: Routes = [
  {
    path: '',
    component: ImpressaoExtratoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImpressaoExtratoPageRoutingModule {}
