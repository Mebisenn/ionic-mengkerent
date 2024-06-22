import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PemesananPage } from './pemesanan.page';

const routes: Routes = [
  {
    path: '',
    component: PemesananPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PemesananPageRoutingModule {}
