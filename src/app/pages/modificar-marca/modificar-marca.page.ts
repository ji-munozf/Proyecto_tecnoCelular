import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BdService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-modificar-marca',
  templateUrl: './modificar-marca.page.html',
  styleUrls: ['./modificar-marca.page.scss'],
})
export class ModificarMarcaPage implements OnInit {

  nombre = "";
  id=0;

  constructor(private router: Router, private activedRouter: ActivatedRoute, private servicioBD: BdService, private alertController: AlertController, public toastCtrl: ToastController) { 
    this.activedRouter.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.id = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado'];
        this.nombre = this.router.getCurrentNavigation()?.extras?.state?.['nombreEnviado'];
      }
    })
  }

  async modificar() {
    const alert = await this.alertController.create({
      header: '¿Estas seguro de que quieres guardar los cambios?',
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
              color: 'light'
            });
            toast.present();
            this.router.navigate(['/listar-marca-admin']);
          },
        },
      ],
    });
    this.servicioBD.modificarMarca(this.id,this.nombre);
    await alert.present();
  }

  ngOnInit() {
  }

}
