import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReqotpsPageRoutingModule } from './reqotps-routing.module';

import { ReqotpsPage } from './reqotps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReqotpsPageRoutingModule
  ],
  declarations: [ReqotpsPage]
})
export class ReqotpsPageModule {}
