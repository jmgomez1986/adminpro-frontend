import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActualizarMedicoResponse } from '../interfaces/actualizar-medico-response.interface';
import { CargarMedicosResponse, CargarMedicoByIdResponse } from '../interfaces/cargar-medicos-response.interface';
import { EliminarResponse } from '../interfaces/eliminar-response.interface';
import { HeadersHttp } from '../interfaces/headers.interface';
import { Medico } from '../models/medico.model';

const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(): HeadersHttp {
    return {
      headers: { 'x-token': this.token },
    };
  }

  cargarMedicos() {
    const url = `${BASE_URL}/medicos`;
    return this.http
      .get<CargarMedicosResponse>(url, this.headers)
      .pipe(map((resp) => resp.medicos));
  }

  getMedicoById(id: string) {
    const url = `${BASE_URL}/medicos/${id}`;
    return this.http
      .get<CargarMedicoByIdResponse>(url, this.headers)
      .pipe(map((resp) => resp.medicos));
  }

  crearMedico(medico: { nombre: string; hospital: string }) {
    const url = `${BASE_URL}/medicos`;
    return this.http.post<ActualizarMedicoResponse>(url, medico, this.headers);
  }

  actualizarMedico(medico: Medico) {
    const url = `${BASE_URL}/medicos/${medico._id}`;
    return this.http.put<ActualizarMedicoResponse>(url, medico, this.headers);
  }

  eliminarMedico(id: string) {
    const url = `${BASE_URL}/medicos/${id}`;
    return this.http.delete<EliminarResponse>(url, this.headers);
  }
}
