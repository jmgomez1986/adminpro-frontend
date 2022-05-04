import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from './../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from './../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  public user: Usuario;

  constructor(
    private router: Router,
    public sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.user = this.usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }
}
