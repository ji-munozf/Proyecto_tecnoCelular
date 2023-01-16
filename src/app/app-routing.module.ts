import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'menu-cliente',
    loadChildren: () => import('./pages/menu-cliente/menu-cliente.module').then( m => m.MenuClientePageModule)
  },
  {
    path: 'menu-admin',
    loadChildren: () => import('./pages/menu-admin/menu-admin.module').then( m => m.MenuAdminPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'tienda',
    loadChildren: () => import('./pages/tienda/tienda.module').then( m => m.TiendaPageModule)
  },
  {
    path: 'listar-productos-admin',
    loadChildren: () => import('./pages/listar-productos-admin/listar-productos-admin.module').then( m => m.ListarProductosAdminPageModule)
  },
  {
    path: 'agregar-productos',
    loadChildren: () => import('./pages/agregar-productos/agregar-productos.module').then( m => m.AgregarProductosPageModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  {
    path: 'modificar-producto',
    loadChildren: () => import('./pages/modificar-producto/modificar-producto.module').then( m => m.ModificarProductoPageModule)
  },
  {
    path: 'detalle-producto',
    loadChildren: () => import('./pages/detalle-producto/detalle-producto.module').then( m => m.DetalleProductoPageModule)
  },
  {
    path: 'mis-compras',
    loadChildren: () => import('./pages/mis-compras/mis-compras.module').then( m => m.MisComprasPageModule)
  },
  {
    path: 'listar-marca-admin',
    loadChildren: () => import('./pages/listar-marca-admin/listar-marca-admin.module').then( m => m.ListarMarcaAdminPageModule)
  },
  {
    path: 'modificar-marca',
    loadChildren: () => import('./pages/modificar-marca/modificar-marca.module').then( m => m.ModificarMarcaPageModule)
  },
  {
    path: 'agregar-marca',
    loadChildren: () => import('./pages/agregar-marca/agregar-marca.module').then( m => m.AgregarMarcaPageModule)
  },
  {
    path: 'listar-usuarios-admin',
    loadChildren: () => import('./pages/listar-usuarios-admin/listar-usuarios-admin.module').then( m => m.ListarUsuariosAdminPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
