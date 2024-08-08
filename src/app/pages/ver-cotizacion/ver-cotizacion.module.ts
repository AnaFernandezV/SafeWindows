import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerCotizacionPageRoutingModule } from './ver-cotizacion-routing.module';

import { VerCotizacionPage } from './ver-cotizacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerCotizacionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VerCotizacionPage]
})
export class VerCotizacionPageModule {}
