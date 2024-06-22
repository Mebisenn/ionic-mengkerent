import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoregPageRoutingModule } from './loreg-routing.module';

import { LoregPage } from './loreg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoregPageRoutingModule
  ],
  declarations: [LoregPage]
})
export class LoregPageModule {}
