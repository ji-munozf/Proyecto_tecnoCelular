import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BdService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-listar-marca-admin',
  templateUrl: './listar-marca-admin.page.html',
  styleUrls: ['./listar-marca-admin.page.scss'],
})
export class ListarMarcaAdminPage implements OnInit {

  listaMarca: any = [
    {
      id: 0,
      nombre: ''
    }
  ]

  constructor(private router: Router, public toastCtrl: ToastController, private alertController: AlertController, private servicioBD: BdService) { }

  ngOnInit() {
    //subscribirnos al observable
    this.servicioBD.dbState().subscribe(res => {
      if (res) {
        this.servicioBD.fetchMarca().subscribe(item => {
          this.listaMarca = item;
        })
      }
    })
  }

  modificarDatos(x: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: x.id,
        nombreEnviado: x.nombre,
      }
    }
    this.router.navigate(['/modificar-marca'], navigationExtras);

  }

  async eliminar(x: any) {
    const alert = await this.alertController.create({
      header: '¿Estás seguro de que quieres eliminar esta marca?',
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
              message: 'Marca eliminada',
              duration: 3000,
              color: 'light'
            });
            this.servicioBD.eliminarMarca(x.id);
            toast.present();
          },
        },
      ],
    });
    await alert.present();
  }

}
