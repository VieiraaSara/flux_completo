import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaisBancosPage } from './mais-bancos.page';

const routes: Routes = [
  {
    path: '',
    component: MaisBancosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaisBancosPageRoutingModule {}
