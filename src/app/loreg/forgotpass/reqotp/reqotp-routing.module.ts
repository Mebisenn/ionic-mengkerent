import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReqotpPage } from './reqotp.page';

const routes: Routes = [
  {
    path: '',
    component: ReqotpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReqotpPageRoutingModule {}
