import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarCatalogoPage } from './agregar-catalogo.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarCatalogoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarCatalogoPageRoutingModule {}
