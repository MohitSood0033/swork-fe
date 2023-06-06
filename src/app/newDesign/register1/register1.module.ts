import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Register1PageRoutingModule } from './register1-routing.module';

import { Register1Page } from './register1.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Register1PageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [Register1Page],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Register1PageModule {}
