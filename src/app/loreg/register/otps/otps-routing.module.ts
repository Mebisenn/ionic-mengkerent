import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpsPage } from './otps.page';

const routes: Routes = [
  {
    path: '',
    component: OtpsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpsPageRoutingModule {}
