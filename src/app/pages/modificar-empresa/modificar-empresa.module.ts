import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarEmpresaPageRoutingModule } from './modificar-empresa-routing.module';

import { ModificarEmpresaPage } from './modificar-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarEmpresaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModificarEmpresaPage]
})
export class ModificarEmpresaPageModule {}
