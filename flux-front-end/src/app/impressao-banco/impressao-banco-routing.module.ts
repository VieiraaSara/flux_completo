import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImpressaoBancoPage } from './impressao-banco.page';

const routes: Routes = [
  {
    path: '',
    component: ImpressaoBancoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImpressaoBancoPageRoutingModule {}
