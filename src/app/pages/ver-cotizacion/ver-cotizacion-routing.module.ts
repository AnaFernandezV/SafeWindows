import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerCotizacionPage } from './ver-cotizacion.page';

const routes: Routes = [
  {
    path: '',
    component: VerCotizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerCotizacionPageRoutingModule {}
