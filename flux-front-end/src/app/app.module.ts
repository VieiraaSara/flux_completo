import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import {
  FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { IonicRouteStrategy } from '@ionic/angular';
import { NgxSpinnerModule } from "ngx-spinner";
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from './_interceptors/interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
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
    // ,
    // {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
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

