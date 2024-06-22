import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PemesananPageRoutingModule } from './pemesanan-routing.module';

import { PemesananPage } from './pemesanan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PemesananPageRoutingModule
  ],
  declarations: [PemesananPage]
})
export class PemesananPageModule {}
