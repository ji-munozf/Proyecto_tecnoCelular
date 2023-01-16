import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { AgregarProductosPageRoutingModule } from './agregar-productos-routing.module';

import { AgregarProductosPage } from './agregar-productos.page';

import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarProductosPageRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  declarations: [AgregarProductosPage]
})
export class AgregarProductosPageModule {}
