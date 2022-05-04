import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { UploadImage } from './../interfaces/upload-image.interface';

const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  async acualizarImagen(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ): Promise<string | boolean> {
    try {
      const url = `${BASE_URL}/upload/${tipo}/${id}`;
      const formData = new FormData();

      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });

      const data: UploadImage = await resp.json();
      return data.ok ? data.nombreArchivo : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
