import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaitAccPage } from './wait-acc.page';

const routes: Routes = [
  {
    path: '',
    component: WaitAccPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitAccPageRoutingModule {}
