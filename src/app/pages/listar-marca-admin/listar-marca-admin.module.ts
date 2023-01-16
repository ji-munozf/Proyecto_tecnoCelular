import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarMarcaAdminPageRoutingModule } from './listar-marca-admin-routing.module';

import { ListarMarcaAdminPage } from './listar-marca-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarMarcaAdminPageRoutingModule
  ],
  declarations: [ListarMarcaAdminPage]
})
export class ListarMarcaAdminPageModule {}
