import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarMarcaAdminPage } from './listar-marca-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ListarMarcaAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarMarcaAdminPageRoutingModule {}
