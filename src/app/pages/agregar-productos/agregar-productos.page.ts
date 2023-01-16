import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BdService } from 'src/app/services/bd.service';

import { Camera, CameraResultType } from '@capacitor/camera/';
import { CameraOptions } from '@capacitor/camera/dist/esm/definitions';
import { Plugins } from '@capacitor/core';

const { camera } = Plugins
@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.page.html',
  styleUrls: ['./agregar-productos.page.scss'],
})
export class AgregarProductosPage implements OnInit {



  codigoProducto = "";
  nombreProducto = "";
  precioProducto = 0;
  stockProducto = 0;
  descripcionProducto = "";
  src: string = "";

  listaMarca: any = [
    {
      id: 0,
      nombreMarca: ''
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
    if (this.codigoProducto == "") {
      //Si el campo código está vacio mostrará un mensaje de que el campo no puede estar vacio.
      const toast = await this.toastCtrl.create({
        message: 'El campo código no puede estar vacio',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.codigoProducto.length < 5) {
      //Si el campo código tiene menos de 5 caracteres sale un aviso.
      const toast = await this.toastCtrl.create({
        message: 'El campo código es demasiado corto',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.nombreProducto == "") {
      //Si el campo nombre está vacio mostrará un mensaje de que el campo no puede estar vacio.
      const toast = await this.toastCtrl.create({
        message: 'El campo nombre no puede estar vacio',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.nombreProducto.length < 3) {
      //Si el campo nombre tiene menos de 3 caracteres sale un aviso.
      const toast = await this.toastCtrl.create({
        message: 'El campo nombre es demasiado corto',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.precioProducto == 0) {
      //Si el campo precio está vacio mostrará un mensaje de que el campo no puede estar vacio.
      const toast = await this.toastCtrl.create({
        message: 'El campo precio no puede estar vacio',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.stockProducto == 0) {
      //Si el campo stock está vacio mostrará un mensaje de que el campo no puede estar vacio.
      const toast = await this.toastCtrl.create({
        message: 'El campo stock no puede estar vacio',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.descripcionProducto == "") {
      //Si el campo descripción está vacio mostrará un mensaje de que el campo no puede estar vacio.
      const toast = await this.toastCtrl.create({
        message: 'El campo descripción no puede estar vacio',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.descripcionProducto.length < 5) {
      //Si el campo descripción tiene menos de 5 caracteres sale un aviso.
      const toast = await this.toastCtrl.create({
        message: 'El campo descripción es demasiado corto',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.listaMarca.nombre == "") {
      const toast = await this.toastCtrl.create({
        message: 'Debe seleccionar una marca',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.src == '') {
      //Si el campo descripción tiene menos de 5 caracteres sale un aviso.
      const toast = await this.toastCtrl.create({
        message: 'Debe seleccionar una foto',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Se ha agregado el producto correctamente',
        duration: 3000,
        color: 'light',
        icon: 'checkmark-outline'
      });
      toast.present();
      this.servicioBD.insertarProducto(this.codigoProducto, this.nombreProducto, this.precioProducto, this.stockProducto, this.descripcionProducto, this.src, this.listaMarca.nombre);
      this.router.navigate(['/listar-productos-admin']);
    }

  }

  TakePic() {

    let options: CameraOptions = {
      quality: 100,
      resultType: CameraResultType.DataUrl,
      saveToGallery: true
    }

    Camera.getPhoto(options).then((result) => {
      if (result.dataUrl) {
        this.src = result.dataUrl;
      }
    })
  }






}













