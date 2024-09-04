import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImpressaoGeralPage } from './impressao-geral.page';

const routes: Routes = [
  {
    path: '',
    component: ImpressaoGeralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImpressaoGeralPageRoutingModule {}
