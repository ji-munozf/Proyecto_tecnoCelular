import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BdService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {

  codigoProducto = "";
  nombreProducto = "";
  precioProducto = 0;
  stockProducto = 0;
  descripcionProducto = "";
  imgProducto = "";
  id=0;

  cantidad = 1;
  total = 0;

  constructor(private router: Router, private activedRouter: ActivatedRoute, private servicioBD: BdService) {
    this.activedRouter.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.id = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado'];
        this. codigoProducto = this.router.getCurrentNavigation()?.extras?.state?.['codigoEnviado'];
        this.nombreProducto = this.router.getCurrentNavigation()?.extras?.state?.['nombreEnviado'];
        this.precioProducto = this.router.getCurrentNavigation()?.extras?.state?.['precioEnviado'];
        this.stockProducto = this.router.getCurrentNavigation()?.extras?.state?.['stockEnviado'];
        this.descripcionProducto = this.router.getCurrentNavigation()?.extras?.state?.['descripcionEnviado'];
        this.imgProducto = this.router.getCurrentNavigation()?.extras?.state?.['imgEnviado'];
        this.total = this.router.getCurrentNavigation()?.extras?.state?.['precioEnviado'];
      }
    })
  }

  ngOnInit() {
  }

  restItem(){
    if(this.cantidad > 1){
      this.cantidad -= 1;
      this.total = this.precioProducto * this.cantidad;
      console.log("cantidadAdd", this.cantidad)
    }
  }

  addItem(){
    if(this.cantidad > 0){
      this.cantidad += 1;
      this.total = this.precioProducto * this.cantidad;
      console.log("cantidadAdd", this.cantidad)
      console.log("precio", this.precioProducto)
    }
  }

}
