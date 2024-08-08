import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarTransportePageRoutingModule } from './agregar-transporte-routing.module';

import { AgregarTransportePage } from './agregar-transporte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarTransportePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarTransportePage]
})
export class AgregarTransportePageModule {}
