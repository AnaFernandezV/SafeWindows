import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarProveedorPageRoutingModule } from './modificar-proveedor-routing.module';

import { ModificarProveedorPage } from './modificar-proveedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarProveedorPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModificarProveedorPage]
})
export class ModificarProveedorPageModule {}
