import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaitAccPageRoutingModule } from './wait-acc-routing.module';

import { WaitAccPage } from './wait-acc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaitAccPageRoutingModule
  ],
  declarations: [WaitAccPage]
})
export class WaitAccPageModule {}
