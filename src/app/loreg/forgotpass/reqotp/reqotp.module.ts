import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReqotpPageRoutingModule } from './reqotp-routing.module';

import { ReqotpPage } from './reqotp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReqotpPageRoutingModule
  ],
  declarations: [ReqotpPage]
})
export class ReqotpPageModule {}
