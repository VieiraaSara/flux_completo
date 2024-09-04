import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'carteira',
        loadChildren: () => import('../carteira/carteira.module').then(m => m.CarteiraPageModule)
      },
      {
        path: 'meus-bancos',
        loadChildren: () => import('../meus-bancos/meus-bancos.module').then(m => m.MeusBancosPageModule)
      },
      {
        path: 'impressao-extrato',
        loadChildren: () => import('../impressao-extrato/impressao-extrato.module').then(m => m.ImpressaoExtratoPageModule)
      },
      {
        path: 'config-flux',
        loadChildren: () => import('../config-flux/config-flux.module').then(m => m.ConfigFluxPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
