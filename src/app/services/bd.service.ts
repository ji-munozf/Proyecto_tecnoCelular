import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Marca } from './marca';
import { Producto } from './producto';
import { Rol } from './rol';
import { Usuario } from './usuario';



@Injectable({
  providedIn: 'root'
})
export class BdService {

  //crear una variable para mi BD
  public database: SQLiteObject = new SQLiteObject(null);



  //variables para las tablas
  tablaProducto: string = "CREATE TABLE IF NOT EXISTS producto(id_producto INTEGER PRIMARY KEY autoincrement, codigo VARCHAR(10) NOT NULL, nombre VARCHAR(40) NOT NULL, precio INTEGER NOT NULL, stock INTEGER NOT NULL, descripcion TEXT NOT NULL, img BLOB NOT NULL, id_marca INTEGER, FOREIGN KEY(id_marca) REFERENCES marca(id_marca));";
  tablaMarca: string = "CREATE TABLE IF NOT EXISTS marca(id_marca INTEGER PRIMARY KEY autoincrement, nom_marca VARCHAR(15) NOT NULL);";
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(nroRut INTEGER PRIMARY KEY autoincrement, dv INTEGER NOT NULL, nombres VARCHAR(40) NOT NULL, appat VARCHAR(30) NOT NULL, apmat VARCHAR(30) NOT NULL, username VARCHAR(15) NOT NULL, password VARCHAR(15) NOT NULL, id_rol INTEGER, FOREIGN KEY(id_rol) REFERENCES rol(id_rol));";
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(id_rol INTEGER PRIMARY KEY autoincrement, nom_rol VARCHAR(20) NOT NULL);";


  //variables para datos de inicio en mis tablas
  insertProducto: string = "INSERT OR IGNORE INTO producto(id_producto,codigo,nombre,precio,stock,descripcion,img, id_marca) VALUES (1,'2S3434FR6','APPLE IPHONE 11 64GB NEGRO',449990,20,'Esta es la descripción del IPHONE 11','/assets/img/iphone11.jpg',2), (2,'2364GH7893','MOTOROLA G60S 128GB AZUL',169990,35,'Esta es la descripción del MOTOROLA G60S','/assets/img/motorolag60s.jpg',4), (3,'DS7836DT67','SAMSUNG GALAXY A73 5G 128GB WHITE',429990,50,'Esta es la descripción del SAMSUNG GALAXY A73','/assets/img/galaxya73.jpg',3), (4,'45UFU7589','APPLE IPHONE 14 128GB AZUL',949990,29,'Esta es la descripción del IPHONE 14','/assets/img/iphone14.jpg',2);";
  insertMarca: string = "INSERT OR IGNORE INTO marca(id_marca, nom_marca) VALUES (1,'Xiaomi'), (2,'Iphone'), (3,'Samsung'), (4,'Motorola'), (5,'LG'), (6,'Nokia'), (7,'Vivo'), (8,'Xperia'), (9,'Huawei'), (10,'Pixel'), (11,'OPPO');";
  insertUsuario: string = "INSERT OR IGNORE INTO usuario(nroRut, dv, nombres, appat, apmat, username, password, id_rol) VALUES (19930871, 1 , 'Nicolas Antonio', 'Parra', 'Munoz', 'kaniko', 'admin1234', 1), (20287177, 1, 'Juan Ignacio', 'Munoz', 'Fuentes', 'ji.munozf', 'JuanIgnacio1', 2);";
  insertRol: string = "INSERT OR IGNORE INTO rol(id_rol, nom_rol) VALUES (1,'Administrador'), (2,'Cliente');";

  //variable para guardar los registros de cada tabla de BD
  //listaNoticias = new BehaviorSubject([]);
  p: Producto[] = [];
  listaProducto: BehaviorSubject<Producto[]> = new BehaviorSubject(this.p);

  m: Marca[] = [];
  listaMarca: BehaviorSubject<Marca[]> = new BehaviorSubject(this.m);

  u: Usuario[] = [];
  listaUsuario: BehaviorSubject<Usuario[]> = new BehaviorSubject(this.u);

  r: Rol[] = [];
  listaRol: BehaviorSubject<Rol[]> = new BehaviorSubject(this.r);

  //observable para manipular el estatus de la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, public alertController: AlertController) {
    this.crearBaseDeDatos();
  }


  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  //metodo que indique el estado de la BD
  dbState() {
    return this.isDBReady.asObservable();
  }

  //funcion para retornar la listas de los select como observable
  fetchProductos(): Observable<Producto[]> {
    return this.listaProducto.asObservable();
  }

  fetchMarca(): Observable<Marca[]> {
    return this.listaMarca.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]> {
    return this.listaUsuario.asObservable();
  }

  fetchRol(): Observable<Rol[]> {
    return this.listaRol.asObservable();
  }

  crearBaseDeDatos() {
    //varificar si la plataforma esta lista
    this.platform.ready().then(() => {

      //creamos la BD
      this.sqlite.create({
        name: 'tecnocelular1.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        //llamar a la creacion de Tablas
        this.crearTablas();
      }).catch((e: string) => {
        //muestro el error
        this.presentAlert("Error en BD: " + e);
      })
    }).catch(e => {
      //muestro el error
      this.presentAlert("Error en Platform: " + e);
    })
  }

  async crearTablas() {
    try {
      //ejecutar creacion de tablas
      await this.database.executeSql(this.tablaProducto,[]);
      await this.database.executeSql(this.tablaMarca,[]);
      await this.database.executeSql(this.tablaUsuario,[]);
      await this.database.executeSql(this.tablaRol,[]);

      //ejecutar insert por defecto
      await this.database.executeSql(this.insertProducto,[]);
      await this.database.executeSql(this.insertMarca,[]);
      await this.database.executeSql(this.insertUsuario,[]);
      await this.database.executeSql(this.insertRol,[]);

      //llamar al metodo para select de mi tabla principal (opcional)
      this.buscarProductos();
      this.buscarMarca();
      this.buscarUsuario();
      this.buscarRol(); 

      //modificar el observable de la BD lista
      this.isDBReady.next(true);

    } catch (e) {
      this.presentAlert("Error en Tablas: " + e);
    }
  }

  buscarProductos() {
    return this.database.executeSql('SELECT * FROM producto', []).then(res => {
      //variable para almacenar la info del select
      let items: Producto[] = [];

      //verificar la cantidad de filas que genere la sentencia select
      if (res.rows.length > 0) {
        //recorro el resulset para ir guardando en la lista
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id_producto,
            codigo: res.rows.item(i).codigo,
            nombre: res.rows.item(i).nombre,
            precio: res.rows.item(i).precio,
            stock: res.rows.item(i).stock,
            descripcion: res.rows.item(i).descripcion,
            img: res.rows.item(i).img,
            id_marca: res.rows.item(i).id_marca
          })
        }
      }

      //actualizamos el observable
      this.listaProducto.next(items);

    })
  }

  insertarProducto(codigo: string, nombre: string, precio: number, stock: number, descripcion: string, img: string, id_marca: number) {

    let data = [codigo, nombre, precio, stock, descripcion,img, id_marca];
    return this.database.executeSql('INSERT or IGNORE INTO producto(codigo,nombre,precio,stock,descripcion,img, id_marca) VALUES (?,?,?,?,?,?,?)', data).then(res => {
      this.buscarProductos();
    })

  }

  modificarProducto(id: number, codigo: string, nombre: string, precio: number, stock: number, descripcion: string, img: string, id_marca: number) {
    let data = [codigo, nombre, precio, stock, descripcion, img, id_marca,id];
    return this.database.executeSql('UPDATE producto SET codigo = ?, nombre = ?, precio = ?, stock = ?, descripcion = ?, img = ?, id_marca = ? WHERE id_producto = ?', data).then(res2 => {
      this.buscarProductos();
    })
  }

  eliminarProducto(id: number) {
    return this.database.executeSql('DELETE FROM producto WHERE id_producto = ?', [id]).then(e => {
      this.buscarProductos();
    })

  }


  //----------------------------------------------------------------------- Marca -----------------------------------------------------------------------------------------------------

  buscarMarca() {
    return this.database.executeSql('SELECT * FROM marca', []).then(res => {
      //variable para almacenar la info del select
      let items: Marca[] = [];

      //verificar la cantidad de filas que genere la sentencia select
      if (res.rows.length > 0) {
        //recorro el resulset para ir guardando en la lista
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id_marca,
            nombreMarca: res.rows.item(i).nom_marca
          })
        }
      }

      //actualizamos el observable
      this.listaMarca.next(items);

    })
  }

  insertarMarca(nombre: string) {

    let data = [nombre];
    return this.database.executeSql('INSERT or IGNORE INTO marca(nom_marca) VALUES (?)', data).then(res => {
      this.buscarMarca();
    })

  }

  modificarMarca(id: number, nombre: string) {
    let data = [nombre, id];
    return this.database.executeSql('UPDATE marca SET nom_marca = ? WHERE id_marca = ?', data).then(res2 => {
      this.buscarMarca();
    })
  }

  eliminarMarca(id: number) {
    return this.database.executeSql('DELETE FROM marca WHERE id_marca = ?', [id]).then(e => {
      this.buscarMarca();
    })

  }

  //----------------------------------------------------------------------- Usuario -----------------------------------------------------------------------------------------------------



  buscarUsuario() {
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      //variable para almacenar la info del select
      let items: Usuario[] = [];

      //verificar la cantidad de filas que genere la sentencia select
      if (res.rows.length > 0) {
        //recorro el resulset para ir guardando en la lista
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            nroRut: res.rows.item(i).nroRut,
            dv: res.rows.item(i).dv,
            nombres: res.rows.item(i).nombres,
            appat: res.rows.item(i).appat,
            apmat: res.rows.item(i).apmat,
            username: res.rows.item(i).username,
            password: res.rows.item(i).password,
            id_rol: res.rows.item(i).id_rol,
          })
        }
      }

      //actualizamos el observable
      this.listaUsuario.next(items);

    })
  }

  insertarUsuario(nroRut: number, dv: number, nombres: string, appat: string, apmat: string, username: string, password: string, id_rol: number) {

    let data = [nroRut, dv, nombres, appat, apmat, username, password, id_rol];
    return this.database.executeSql('INSERT or IGNORE INTO usuario(nroRut, dv, nombres, appat, apmat, username, password, id_rol) VALUES (?,?,?,?,?,?,?,?)', data).then(res => {
      this.buscarUsuario();
    })

  }

  modificarUsuario(nroRut: number, dv: number, nombres: string, appat: number, apmat: number, username: string, password: string, id_rol: number) {
    let data = [dv, nombres, appat, apmat, username, password, id_rol, nroRut];
    return this.database.executeSql('UPDATE usuario SET nroRut = ?, dv = ?, nombres = ?, appat = ?, apmat = ?, username = ?, password = ?, id_rol =? WHERE nroRut = ?', data).then(res2 => {
      this.buscarUsuario();
    })
  }

  eliminarUsuario(nroRut: number) {
    return this.database.executeSql('DELETE FROM usuario WHERE nroRut = ?', [nroRut]).then(e => {
      this.buscarUsuario();
    })
  }


  //----------------------------------------------------------------------- Rol -----------------------------------------------------------------------------------------------------

  buscarRol() {
    return this.database.executeSql('SELECT * FROM rol', []).then(res => {
      //variable para almacenar la info del select
      let items: Rol[] = [];

      //verificar la cantidad de filas que genere la sentencia select
      if (res.rows.length > 0) {
        //recorro el resulset para ir guardando en la lista
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_rol: res.rows.item(i).id_rol,
            nom_rol: res.rows.item(i).nom_rol
          })
        }
      }

      //actualizamos el observable
      this.listaRol.next(items);

    })
  }















  

}

