import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BdService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-listar-productos-admin',
  templateUrl: './listar-productos-admin.page.html',
  styleUrls: ['./listar-productos-admin.page.scss'],
})
export class ListarProductosAdminPage implements OnInit {

  listaProducto: any = [
    {
      id: 0,
      codigo: '',
      nombre: '',
      precio: 0,
      stock: 0,
      descripcion: '',
      img: '',
      id_marca: 0,
    }
  ]

  constructor(private router: Router, public toastCtrl: ToastController, private alertController: AlertController, private servicioBD: BdService) { }


  ngOnInit() {
    //subscribirnos al observable
    this.servicioBD.dbState().subscribe(res => {
      if (res) {
        this.servicioBD.fetchProductos().subscribe(item => {
          this.listaProducto = item;
        })
      }
    })
  }


  modificarDatos(x: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: x.id,
        codigoEnviado: x.codigo,
        nombreEnviado: x.nombre,
        precioEnviado: x.precio,
        stockEnviado: x.stock,
        descripcionEnviado: x.descripcion,
        imgEnviado: x.img,
        idMarcaEnviado: x.id_marca,
      }
    }
    this.router.navigate(['/modificar-producto'], navigationExtras);

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
            this.servicioBD.eliminarProducto(x.id);
            toast.present();
          },
        },
      ],
    });
    await alert.present();
  }

}
