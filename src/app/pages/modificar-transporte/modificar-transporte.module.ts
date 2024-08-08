import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarTransportePageRoutingModule } from './modificar-transporte-routing.module';

import { ModificarTransportePage } from './modificar-transporte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarTransportePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModificarTransportePage]
})
export class ModificarTransportePageModule {}
