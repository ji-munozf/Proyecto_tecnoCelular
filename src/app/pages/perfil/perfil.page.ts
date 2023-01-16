import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  nombre = "Juan Ignacio";
  appaterno = "Muñoz";
  apmaterno = "Fuentes";
  usuario = "ji.munozf";

  constructor(private router: Router, public toastCtrl: ToastController, private alertController: AlertController) { }

  ngOnInit() {
  }

  async editar() {
    const alert = await this.alertController.create({
      header: '¿Estas seguro que quieres guardar los cambios?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Estoy seguro',
          role: 'confirm',
          handler: async () => {
            const toast = await this.toastCtrl.create({
              message: 'Se han guardado los cambios correctamente',
              duration: 2000,
              color: 'light',
              icon: 'checkmark-outline'
            });
            toast.present();
            this.router.navigate(['/menu-cliente']);
          },
        },
      ],
    });
    await alert.present();
  }

}
