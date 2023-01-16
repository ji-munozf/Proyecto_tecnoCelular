import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = "";
  password: string = "";
  id_rol: number = 0;
  
  hide = true;

  checked = false;
  labelPosition: 'before' | 'after' = 'after';

  constructor(private router: Router, public toastCtrl: ToastController) { }

  ngOnInit() {
  }





  async irAlMenu() {
    if (this.usuario == "") {
      //Si el campo usuario está vacio mostrará un mensaje de que el campo no puede estar vacio.
      const toast = await this.toastCtrl.create({
        message: 'El campo usuario no puede estar vacio',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.password == "") {
      //Si el campo contraseña está vacio mostrará un mensaje de que el campo no puede estar vacio.
      const toast = await this.toastCtrl.create({
        message: 'El campo contraseña no puede estar vacio',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    } else if (this.usuario == "ji.munozf" && this.password == "JuanIgnacio1") {
      //Si el usario son ji.munozf y la contraseña es JuanIgnacio1 redirecciona al menú cliente.
      this.router.navigate(['/menu-cliente']);
    } else if (this.usuario == "admin" && this.password == "TecnoCelular2023") {
      //Si el usario son admin y la contraseña es TecnoCelular2023 redirecciona al menú cliente.
      this.router.navigate(['/menu-admin']);
    } else {
      //Si no se cumple las condiciones anteriores mostrará que los campos ingresados no son correctos
      const toast = await this.toastCtrl.create({
        message: 'El usuario y/o contraseña son incorrectos',
        duration: 2000,
        color: 'light',
        icon: 'warning-outline'
      });
      toast.present();
    }
  }










  
}
