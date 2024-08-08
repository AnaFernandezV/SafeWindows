import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModificarCredencialPage } from './modificar-credencial.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarCredencialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarCredencialPageRoutingModule {}
