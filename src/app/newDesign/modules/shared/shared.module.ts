import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,IonicModule,RouterModule,FormsModule
  ],
  exports: [
   
    FooterComponent,
 
  ],
})
export class SharedModule { }
