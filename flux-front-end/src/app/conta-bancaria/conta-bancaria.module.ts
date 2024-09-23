import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContaBancariaPageRoutingModule } from './conta-bancaria-routing.module';

import { ContaBancariaPage } from './conta-bancaria.page';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';

export const customCurrencyMaskConfig:CurrencyMaskConfig = {
  align: 'center',
  allowNegative: false,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',

}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContaBancariaPageRoutingModule,
    CurrencyMaskModule,

  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: customCurrencyMaskConfig },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ContaBancariaPage]
})
export class ContaBancariaPageModule {}
