import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BdService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-agregar-marca',
  templateUrl: './agregar-marca.page.html',
  styleUrls: ['./agregar-marca.page.scss'],
})
export class AgregarMarcaPage implements OnInit {

  nombreMarca = "";

  constructor(private router: Router, public toastCtrl: ToastController, private alertController: AlertController, private servicioBD: BdService) { }

  ngOnInit() {
  }

  async regresar() {
    const alert = await this.alertController.create({
      header: '¿Estas seguro que quieres volver?',
      subHeader: 'Se perderá todo el progreso',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Estoy seguro',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/menu-admin']);
          },
        },
      ],
    });
    await alert.present();
  }

  async agregar() {
    if (this.nombreMarca == "") {
      //Si el campo nombreMarca está vacio mostrará un mensaje de que el campo no puede estar vacio.
      const toast = await this.toastCtrl.create({
        message: 'El campo nombre marca no puede estar vacio',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.nombreMarca.length < 2) {
      //Si el campo nombreMarca tiene menos de 2 caracteres sale un aviso.
      const toast = await this.toastCtrl.create({
        message: 'El campo nombre marca es demasiado corto',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.nombreMarca.length > 15) {
      //Si el campo nombreMarca tiene más de 15 caracteres sale un aviso.
      const toast = await this.toastCtrl.create({
        message: 'El campo nombre marca es demasiado largo (más de 15 caracteres)',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Se ha agregado la marca correctamente',
        duration: 3000,
        color: 'light',
        icon: 'checkmark-outline'
      });
      toast.present();
      this.servicioBD.insertarMarca(this.nombreMarca);
      this.router.navigate(['/listar-marca-admin']);
    }

  }

}
