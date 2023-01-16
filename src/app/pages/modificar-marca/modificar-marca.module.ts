import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarMarcaPageRoutingModule } from './modificar-marca-routing.module';

import { ModificarMarcaPage } from './modificar-marca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarMarcaPageRoutingModule
  ],
  declarations: [ModificarMarcaPage]
})
export class ModificarMarcaPageModule {}
