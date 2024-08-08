import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarTransportePage } from './modificar-transporte.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarTransportePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarTransportePageRoutingModule {}
