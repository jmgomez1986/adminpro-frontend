import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Usuario } from './../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { ModalImagenService } from './../../../services/modal-imagen.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public subs: Subscription;
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuarioTemp: Usuario[] = [];
  public desde: number = 0;
  public limite: number = 5;
  public cargando: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();

    this.subs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(() => {
        this.cargarUsuarios();
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService
      .cargarUsuarios(this.desde, this.limite)
      .subscribe(({ totalReg, usuarios }) => {
        this.totalUsuarios = totalReg;
        this.usuarios = usuarios;
        this.usuarioTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.usuarios = this.usuarioTemp;
      return;
    }
    this.cargando = true;
    this.busquedasService
      .buscar('usuarios', termino)
      .subscribe((resultados: Usuario[]) => {
        this.usuarios = resultados;
        this.cargando = false;
      });
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.usuario.uid) {
      Swal.fire('Error!', 'No puede borrarse a si mismo', 'error');
    } else {
      Swal.fire({
        title: '¿Borrar usuario?',
        text: `Está a punto de borrar a ${usuario.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, borrar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.eliminarUsuario(usuario).subscribe(() => {
            Swal.fire(
              'Usuario borrado!',
              `El usuario ${usuario.nombre} se borró correctamente`,
              'success'
            );
            this.desde = 0;
            this.cargarUsuarios();
          });
        }
      });
    }
  }

  cambiarRol(usuario: Usuario) {
    this.usuarioService
      .guardarUsuario(usuario)
      .subscribe();
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
