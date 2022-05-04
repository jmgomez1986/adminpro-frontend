import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.usuarioService.role === 'ADMIN_ROLE') {
      return true;
    }
    this.router.navigateByUrl('/dashboard');
    return false;
    // return this.usuarioService.role === 'ADMIN_ROLE' ? true : false;
  }
}
