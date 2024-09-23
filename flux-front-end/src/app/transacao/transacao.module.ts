import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransacaoPageRoutingModule } from './transacao-routing.module';

import { TransacaoPage } from './transacao.page';
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
    TransacaoPageRoutingModule,
    CurrencyMaskModule,
  ],  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: customCurrencyMaskConfig },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [TransacaoPage]
})
export class TransacaoPageModule {}
