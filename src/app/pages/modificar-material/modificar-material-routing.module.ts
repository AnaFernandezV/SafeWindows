import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarMaterialPage } from './modificar-material.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarMaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarMaterialPageRoutingModule {}
