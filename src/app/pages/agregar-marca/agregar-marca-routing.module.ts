import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarMarcaPage } from './agregar-marca.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarMarcaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarMarcaPageRoutingModule {}
