import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarCredencialPageRoutingModule } from './agregar-credencial-routing.module';

import { AgregarCredencialPage } from './agregar-credencial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarCredencialPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarCredencialPage]
})
export class AgregarCredencialPageModule {}
