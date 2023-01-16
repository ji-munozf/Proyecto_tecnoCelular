import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarMarcaPageRoutingModule } from './agregar-marca-routing.module';

import { AgregarMarcaPage } from './agregar-marca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarMarcaPageRoutingModule
  ],
  declarations: [AgregarMarcaPage]
})
export class AgregarMarcaPageModule {}
