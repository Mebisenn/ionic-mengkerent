import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoregPage } from './loreg.page';

const routes: Routes = [
  {
    path: '',
    component: LoregPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoregPageRoutingModule {}
