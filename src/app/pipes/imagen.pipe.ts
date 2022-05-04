import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const BASE_URL = environment.baseUrl;

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {
    if (!img) {
      return `${BASE_URL}/upload/${tipo}/no-image`;
    } else if (img.includes('https')) {
      return img;
    } else if (img) {
      return `${BASE_URL}/upload/${tipo}/${img}`;
    }
    return `${BASE_URL}/upload/${tipo}/no-image`;
  }
}
