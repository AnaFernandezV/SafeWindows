import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuestrosTrabajosPage } from './nuestros-trabajos.page';

const routes: Routes = [
  {
    path: '',
    component: NuestrosTrabajosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuestrosTrabajosPageRoutingModule {}
