import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/newDesign/modules/shared/shared.module';
import { MakePaymentPageRoutingModule } from './make-payment-routing.module';
import { ReactiveFormsModule} from '@angular/forms';
import { MakePaymentPage } from './make-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MakePaymentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MakePaymentPage]
})
export class MakePaymentPageModule {}
