import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarMarcaPage } from './modificar-marca.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarMarcaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarMarcaPageRoutingModule {}
