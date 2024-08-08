import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuestrosTrabajosPageRoutingModule } from './nuestros-trabajos-routing.module';

import { NuestrosTrabajosPage } from './nuestros-trabajos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuestrosTrabajosPageRoutingModule
  ],
  declarations: [NuestrosTrabajosPage]
})
export class NuestrosTrabajosPageModule {}
