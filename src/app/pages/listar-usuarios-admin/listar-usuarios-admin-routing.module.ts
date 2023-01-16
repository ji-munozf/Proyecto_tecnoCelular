import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarUsuariosAdminPage } from './listar-usuarios-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ListarUsuariosAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarUsuariosAdminPageRoutingModule {}
