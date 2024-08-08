import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarProveedorPage } from './modificar-proveedor.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarProveedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarProveedorPageRoutingModule {}
