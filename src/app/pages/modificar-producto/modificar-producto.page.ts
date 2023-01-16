import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BdService } from 'src/app/services/bd.service';

import { Camera, CameraResultType } from '@capacitor/camera/';
import { CameraOptions } from '@capacitor/camera/dist/esm/definitions';
import { Plugins } from '@capacitor/core';


const { camera } = Plugins
@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.page.html',
  styleUrls: ['./modificar-producto.page.scss'],
})
export class ModificarProductoPage implements OnInit {

  codigoProducto = "";
  nombreProducto = "";
  precioProducto = 0;
  stockProducto = 0;
  descripcionProducto = "";
  imgProducto = "";
  id_marca = 0;
  id=0;

  constructor(private router: Router, private activedRouter: ActivatedRoute, private servicioBD: BdService, private alertController: AlertController, public toastCtrl: ToastController) { 
    this.activedRouter.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.id = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado'];
        this.codigoProducto = this.router.getCurrentNavigation()?.extras?.state?.['codigoEnviado'];
        this.nombreProducto = this.router.getCurrentNavigation()?.extras?.state?.['nombreEnviado'];
        this.precioProducto = this.router.getCurrentNavigation()?.extras?.state?.['precioEnviado'];
        this.stockProducto = this.router.getCurrentNavigation()?.extras?.state?.['stockEnviado'];
        this.descripcionProducto = this.router.getCurrentNavigation()?.extras?.state?.['descripcionEnviado'];
        this.imgProducto = this.router.getCurrentNavigation()?.extras?.state?.['imgEnviado'];
        this.id_marca = this.router.getCurrentNavigation()?.extras?.state?.['idMarcaEnviado'];
      }
    })
  }

  async modificar() {
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
              color: 'light'
            });
            toast.present();
            this.router.navigate(['/listar-productos-admin']);
          },
        },
      ],
    });
    this.servicioBD.modificarProducto(this.id,this.codigoProducto, this.nombreProducto, this.precioProducto, this.stockProducto, this.descripcionProducto,this.imgProducto,this.id_marca);
    await alert.present();
  }

  ngOnInit() {
  }

  TakePic() {

    let options: CameraOptions = {
      quality: 100,
      resultType: CameraResultType.DataUrl,
      saveToGallery: true
    }

    Camera.getPhoto(options).then((result) => {
      if (result.dataUrl) {
        this.imgProducto = result.dataUrl;
      }
    })
  }

}
