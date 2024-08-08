import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarMaterialPageRoutingModule } from './modificar-material-routing.module';

import { ModificarMaterialPage } from './modificar-material.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarMaterialPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModificarMaterialPage]
})
export class ModificarMaterialPageModule {}
