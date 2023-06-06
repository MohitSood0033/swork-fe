import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from './../modules/shared/shared.module';
import { Home2PageRoutingModule } from './home2-routing.module';
import { FilterPipe } from 'src/app/pages/shop-product-details/filter.pipe'; 
import { Home2Page } from './home2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    Home2PageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [Home2Page,FilterPipe]
})
export class Home2PageModule {}
