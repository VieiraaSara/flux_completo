import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

import { IonicModule } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { CadastroUsuarioPage } from './cadastro-usuario/cadastro-usuario.page';
import { AuthInterceptor } from './interceptor';
import { AuthService } from './services/auth.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {  IonicRouteStrategy } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {IonicInputMaskModule} from "@thiagoprz/ionic-input-mask";
IonicInputMaskModule
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    }),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
FormsModule,
MatCheckboxModule,

  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,multi: true },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue:{duration: 2500} }
  ],
  bootstrap: [AppComponent],
})



export class AppModule {
  private apiUrl = environment.baseApiUrl;
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab, far);
  }
}
export function jwtOptionsFactory(authService: AuthService) {
  return {
    tokenGetter: () => {
      return authService.getToken();
    },
    whitelistedDomains: ['localhost:3000']
  };
}

