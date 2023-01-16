import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BdService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-listar-usuarios-admin',
  templateUrl: './listar-usuarios-admin.page.html',
  styleUrls: ['./listar-usuarios-admin.page.scss'],
})
export class ListarUsuariosAdminPage implements OnInit {

  listaUsuario: any = [
    {
        nroRut: 0,
        dv: 0,
        nombres: '',
        appat: '',
        apmat: '',
        username: '',
        password: '',
        id_rol: 0,
    }
  ]

  constructor(private router: Router, public toastCtrl: ToastController, private alertController: AlertController, private servicioBD: BdService) { }

  ngOnInit() {
    //subscribirnos al observable
    this.servicioBD.dbState().subscribe(res => {
      if (res) {
        this.servicioBD.fetchUsuario().subscribe(item => {
          this.listaUsuario = item;
        })
      }
    })
  }

  async eliminar(x: any) {
    const alert = await this.alertController.create({
      header: '¿Estas seguro que quieres eliminar este producto?',
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
              message: 'Producto eliminado',
              duration: 3000,
              color: 'light'
            });
            this.servicioBD.eliminarUsuario(x.nroRut);
            toast.present();
          },
        },
      ],
    });
    await alert.present();
  }


  

}
