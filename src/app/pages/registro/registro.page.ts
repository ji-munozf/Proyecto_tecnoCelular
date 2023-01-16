import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BdService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  
  nroRut: number = 0;
  dv: number = 0;
  nombres: string = "";
  appaterno: string = "";
  apmaterno: string = "";
  usuario: string = "";
  password1: string = "";
  password2: string = "";
  id_rol: number = 2;

  hide = true;
  hide1 = true;

  constructor(private router: Router, public toastCtrl: ToastController, private alertController: AlertController, private servicioBD: BdService) { }

  ngOnInit() {
  }

  //diferente de: !=

  onKeyPress(event: { keyCode: number; }) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
      return true
    }
    else {
      return false
    }
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
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
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    await alert.present();
  }

  async registrarse() {
    if (this.nombres == "") {
      //Si el campo nombre está vacio mostrará un mensaje de que el campo no puede estar vacio.
      const toast = await this.toastCtrl.create({
        message: 'El campo nombre no puede estar vacio',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.nombres.length < 2) {
      //Si el campo nombre tiene menos de 2 caracteres sale un aviso.
      const toast = await this.toastCtrl.create({
        message: 'El campo nombre es demasiado corto',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.nroRut == 0) {
      //Si el campo apellido paterno está vacio mostrará un mensaje de que el campo no puede estar vacio.
      const toast = await this.toastCtrl.create({
        message: 'El campo número rut no puede ser 0',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.appaterno == "") {
      //Si el campo apellido paterno está vacio mostrará un mensaje de que el campo no puede estar vacio.
      const toast = await this.toastCtrl.create({
        message: 'El campo apellido paterno no puede estar vacio',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.appaterno.length < 2) {
      //Si el campo apellido paterno tiene menos de 2 caracteres sale un aviso.
      const toast = await this.toastCtrl.create({
        message: 'El campo apellido paterno es demasiado corto',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.apmaterno == "") {
      //Si el campo apellido materno está vacio mostrará un mensaje de que el campo no puede estar vacio.
      const toast = await this.toastCtrl.create({
        message: 'El campo apellido materno no puede estar vacio',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.apmaterno.length < 2) {
      //Si el campo apellido materno tiene menos de 2 caracteres sale un aviso.
      const toast = await this.toastCtrl.create({
        message: 'El campo apellido materno es demasiado corto',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.usuario == "") {
      //Si el campo usuario está vacio mostrará un mensaje de que el campo no puede estar vacio.
      const toast = await this.toastCtrl.create({
        message: 'El campo usuario no puede estar vacio',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.usuario.length < 2) {
      //Si el campo usuario tiene menos de 2 caracteres sale un aviso.
      const toast = await this.toastCtrl.create({
        message: 'El campo usuario es demasiado corto',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.password1 == "") {
      //Si el campo contraseña 1 está vacio mostrará un mensaje de que el campo no puede estar vacio.
      const toast = await this.toastCtrl.create({
        message: 'El campo contraseña no puede estar vacio',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.password1.length < 8) {
      //Si el campo contraseña 1 tiene menos de 8 caracteres sale un aviso.
      const toast = await this.toastCtrl.create({
        message: 'La contraseña debe tener más de 8 caracteres',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.password1.length < 8) {
      //Si el campo contraseña 1 tiene menos de 8 caracteres sale un aviso.
      const toast = await this.toastCtrl.create({
        message: 'La contraseña debe tener más de 8 caracteres',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.password2 == "") {
      //Si el campo contraseña 1 está vacio mostrará un mensaje de que el campo no puede estar vacio.
      const toast = await this.toastCtrl.create({
        message: 'El campo repetir contraseña no puede estar vacio',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.password2 != this.password1) {
      //Si ambas contraseñas no coinciden sale un aviso.
      const toast = await this.toastCtrl.create({
        message: 'Las contraseñas no coinciden',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Te has registrado correctamente',
        duration: 3000,
        color: 'light',
        icon: 'checkmark-outline'
      });
      toast.present();
      this.servicioBD.insertarUsuario(this.nroRut, this.dv, this.nombres, this.appaterno, this.apmaterno, this.usuario, this.password1, this.id_rol);
      this.router.navigate(['/login']);
    }
  }

}
