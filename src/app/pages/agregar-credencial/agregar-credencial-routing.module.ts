import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarCredencialPage } from './agregar-credencial.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarCredencialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarCredencialPageRoutingModule {}
