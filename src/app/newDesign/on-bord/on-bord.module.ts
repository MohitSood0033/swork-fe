import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnBordPageRoutingModule } from './on-bord-routing.module';

import { OnBordPage } from './on-bord.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnBordPageRoutingModule
  ],
  declarations: [OnBordPage]
})
export class OnBordPageModule {}
