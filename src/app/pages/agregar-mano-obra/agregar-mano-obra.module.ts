import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarManoObraPageRoutingModule } from './agregar-mano-obra-routing.module';

import { AgregarManoObraPage } from './agregar-mano-obra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarManoObraPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarManoObraPage]
})
export class AgregarManoObraPageModule {}
