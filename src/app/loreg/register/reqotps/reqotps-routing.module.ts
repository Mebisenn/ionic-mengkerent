import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReqotpsPage } from './reqotps.page';

const routes: Routes = [
  {
    path: '',
    component: ReqotpsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReqotpsPageRoutingModule {}
