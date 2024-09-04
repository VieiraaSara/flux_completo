import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigFluxPage } from './config-flux.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigFluxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigFluxPageRoutingModule {}
