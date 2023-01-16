import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarProductosAdminPage } from './listar-productos-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ListarProductosAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarProductosAdminPageRoutingModule {}
