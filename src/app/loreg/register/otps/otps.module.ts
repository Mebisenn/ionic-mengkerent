import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpsPageRoutingModule } from './otps-routing.module';

import { OtpsPage } from './otps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpsPageRoutingModule
  ],
  declarations: [OtpsPage]
})
export class OtpsPageModule {}
