import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.page.html',
  styleUrls: ['./menu-cliente.page.scss'],
})
export class MenuClientePage implements OnInit {

  listaProducto: any = [
    {
      id: 0,
      codigo: '',
      nombre: '',
      precio: 0,
      stock: 0,
      descripcion: '',
      img: ' '
    }
  ]

  constructor(private router: Router, private servicioBD: BdService) { }

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

  detalleProducto(x: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: x.id,
        codigoEnviado: x.codigo,
        nombreEnviado: x.nombre,
        precioEnviado: x.precio,
        stockEnviado: x.stock,
        descripcionEnviado: x.descripcion,
        imgEnviado: x.img,
      }
    }
    this.router.navigate(['/detalle-producto'], navigationExtras);

  }

}
