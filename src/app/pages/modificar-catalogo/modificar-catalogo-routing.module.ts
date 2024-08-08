import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarCatalogoPage } from './modificar-catalogo.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarCatalogoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarCatalogoPageRoutingModule {}
