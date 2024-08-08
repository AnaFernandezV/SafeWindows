import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarTransportePage } from './agregar-transporte.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarTransportePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarTransportePageRoutingModule {}
