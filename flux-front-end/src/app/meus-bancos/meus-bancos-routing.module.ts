import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusBancosPage } from './meus-bancos.page';

const routes: Routes = [
  {
    path: '',
    component: MeusBancosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusBancosPageRoutingModule {}
