import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarCatalogoPageRoutingModule } from './agregar-catalogo-routing.module';

import { AgregarCatalogoPage } from './agregar-catalogo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarCatalogoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarCatalogoPage]
})
export class AgregarCatalogoPageModule {}
