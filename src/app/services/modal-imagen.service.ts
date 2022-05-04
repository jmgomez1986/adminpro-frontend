import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  private ocultaModal: boolean = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public id: string;
  public img?: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this.ocultaModal;
  }

  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no-img'
  ) {
    this.ocultaModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = img;

    // localhost:3000/api/upload/medicos/no-img
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${BASE_URL}/upload/${tipo}/${img}`;
    }
  }

  cerrarModal() {
    this.ocultaModal = true;
  }
}
