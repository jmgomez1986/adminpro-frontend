import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalImagenService } from './../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [],
})
export class ModalImagenComponent {
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(
    public modalImagenService: ModalImagenService,
    private fileUploadService: FileUploadService
  ) {}

  cerrarModal() {
    this.modalImagenService.cerrarModal();
    this.imgTemp = null;
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
    const tipo = this.modalImagenService.tipo;
    const uid = this.modalImagenService.id;

    this.fileUploadService
      .acualizarImagen(this.imagenSubir, tipo, uid)
      .then((img) => {
        Swal.fire('Guardado', 'La imágen s actualizó con exito.', 'success');
        this.modalImagenService.nuevaImagen.emit(typeof img === 'string' ? img : '');
        this.cerrarModal();
      })
      .catch(() => {
        Swal.fire('Error!', 'No se pudo actualizar la imágen', 'error');
      });
  }
}
