import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarManoObraPage } from './agregar-mano-obra.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarManoObraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarManoObraPageRoutingModule {}
