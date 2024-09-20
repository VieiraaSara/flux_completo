import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { HomePageRoutingModule } from './home-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faV } from '@fortawesome/free-solid-svg-icons';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ScrollingModule,
    HomePageRoutingModule,
    ScrollingModule,
    DragScrollComponent,
    DragScrollItemDirective,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HomePage]
})
export class HomePageModule {

}
