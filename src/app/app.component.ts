import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private router: Router, public toastCtrl: ToastController, private alertController: AlertController) {}

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: '¿Estas seguro que quieres cerrar sesión?',
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
              message: 'Has cerrado sesión correctamente',
              duration: 3000,
              color: 'light'
            });
            toast.present();
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    await alert.present();
  }
}
