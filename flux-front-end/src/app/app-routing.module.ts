import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./apresentacao/apresentacao.module').then(m => m.ApresentacaoPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro-banco',
    loadChildren: () => import('./cadastro-banco/cadastro-banco.module').then( m => m.CadastroBancoPageModule)
  },
  {
    path: 'apresentacao',
    loadChildren: () => import('./apresentacao/apresentacao.module').then( m => m.ApresentacaoPageModule)
  },
  {
    path: 'cadastro-usuario',
    loadChildren: () => import('./cadastro-usuario/cadastro-usuario.module').then( m => m.CadastroUsuarioPageModule)
  },
  {
    path: 'confirmacao-autenticacao',
    loadChildren: () => import('./confirmacao-autenticacao/confirmacao-autenticacao.module').then( m => m.ConfirmacaoAutenticacaoPageModule)
  },
  {
    path: 'meus-bancos',
    loadChildren: () => import('./meus-bancos/meus-bancos.module').then( m => m.MeusBancosPageModule)
  },
  {
    path: 'codigo-autenticacao',
    loadChildren: () => import('./codigo-autenticacao/codigo-autenticacao.module').then( m => m.CodigoAutenticacaoPageModule)
  },
  {
    path: 'impressao-extrato',
    loadChildren: () => import('./impressao-extrato/impressao-extrato.module').then( m => m.ImpressaoExtratoPageModule)
  },
  {
    path: 'config-flux',
    loadChildren: () => import('./config-flux/config-flux.module').then( m => m.ConfigFluxPageModule)
  },
  {
    path: 'impressao-geral',
    loadChildren: () => import('./impressao-geral/impressao-geral.module').then( m => m.ImpressaoGeralPageModule)
  },
  {
    path: 'impressao-banco',
    loadChildren: () => import('./impressao-banco/impressao-banco.module').then( m => m.ImpressaoBancoPageModule)
  },
  {
    path: 'carteira',
    loadChildren: () => import('./carteira/carteira.module').then( m => m.CarteiraPageModule)
  },
  {
    path: 'mais-bancos',
    loadChildren: () => import('./mais-bancos/mais-bancos.module').then( m => m.MaisBancosPageModule)
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
