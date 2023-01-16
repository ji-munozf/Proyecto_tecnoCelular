import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarUsuariosAdminPageRoutingModule } from './listar-usuarios-admin-routing.module';

import { ListarUsuariosAdminPage } from './listar-usuarios-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarUsuariosAdminPageRoutingModule
  ],
  declarations: [ListarUsuariosAdminPage]
})
export class ListarUsuariosAdminPageModule {}
