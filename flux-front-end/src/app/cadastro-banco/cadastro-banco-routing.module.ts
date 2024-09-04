import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroBancoPage } from './cadastro-banco.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroBancoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroBancoPageRoutingModule {}
