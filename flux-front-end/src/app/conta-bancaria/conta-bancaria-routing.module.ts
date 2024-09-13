import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContaBancariaPage } from './conta-bancaria.page';

const routes: Routes = [
  {
    path: '',
    component: ContaBancariaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContaBancariaPageRoutingModule {}
