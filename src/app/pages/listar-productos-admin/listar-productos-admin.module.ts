import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarProductosAdminPageRoutingModule } from './listar-productos-admin-routing.module';

import { ListarProductosAdminPage } from './listar-productos-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarProductosAdminPageRoutingModule
  ],
  declarations: [ListarProductosAdminPage]
})
export class ListarProductosAdminPageModule {}
