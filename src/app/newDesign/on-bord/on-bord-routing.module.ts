import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnBordPage } from './on-bord.page';

const routes: Routes = [
  {
    path: '',
    component: OnBordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnBordPageRoutingModule {}
