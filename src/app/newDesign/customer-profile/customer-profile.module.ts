import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from './../modules/shared/shared.module';
import { CustomerProfilePageRoutingModule } from './customer-profile-routing.module';

import { CustomerProfilePage } from './customer-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CustomerProfilePageRoutingModule
  ],
  declarations: [CustomerProfilePage]
})
export class CustomerProfilePageModule {}
