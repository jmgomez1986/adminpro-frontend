import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from './../../services/usuario.service';
import { Usuario } from './../../models/usuario.model';
import { FileUploadService } from './../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public usuario: Usuario;
  public profileForm: FormGroup;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario; // Se esta asignando una referencia
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.profileForm.value).subscribe({
      next: (resp) => {
        const { nombre, email } = resp.usuarioActualizado;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Guardado', 'Los cambios se guardaron con exito.', 'success');
      },
      error: (err) => {
        Swal.fire('Error!', err.error.msg, 'error');
        this.profileForm.get('nombre').setValue(this.usuario.nombre);
        this.profileForm.get('email').setValue(this.usuario.email);
      },
    });
  }

  cambiarImagen($event: any) {
    const file: File = $event.target?.files[0];
    this.imagenSubir = file;

    if (!file) {
      return (this.imgTemp = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen() {
    this.fileUploadService
      .acualizarImagen(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then((img) => {
        this.usuario.img = typeof img === 'string' ? img : '';
        Swal.fire('Guardado', 'La imágen s actualizó con exito.', 'success');
      })
      .catch(() => {
        Swal.fire('Error!', 'No se pudo actualizar la imágen', 'error');
      });
  }
}
