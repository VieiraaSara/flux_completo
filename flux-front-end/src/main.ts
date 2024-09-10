import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { provideEnvironmentNgxMask } from 'ngx-mask'; // Importar a função de configuração do ngx-mask

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(moduleRef => {
    
    const config = {
      validation: false, 
    };
    provideEnvironmentNgxMask(config)
  })
  .catch(err => console.log(err));
