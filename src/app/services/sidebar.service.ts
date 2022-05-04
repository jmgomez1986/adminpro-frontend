import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [];

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }

  // menu: any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       {
  //         titulo: 'Main',
  //         url: '/'
  //       },
  //       {
  //         titulo: 'ProgressBar',
  //         url: 'progress'
  //       },
  //       {
  //         titulo: 'Charts',
  //         url: 'charts'
  //       },
  //       {
  //         titulo: 'Promesas',
  //         url: 'promises'
  //       },
  //       {
  //         titulo: 'Observables RxJs',
  //         url: 'rxjs'
  //       },
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {
  //         titulo: 'Usuarios',
  //         url: 'usuarios'
  //       },
  //       {
  //         titulo: 'Medicos',
  //         url: 'medicos'
  //       },
  //       {
  //         titulo: 'Hospitales',
  //         url: 'hospitales'
  //       }
  //     ]
  //   }
  // ];
}
