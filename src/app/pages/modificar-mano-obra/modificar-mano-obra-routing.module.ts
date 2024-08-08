import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarManoObraPage } from './modificar-mano-obra.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarManoObraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarManoObraPageRoutingModule {}
