import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';

export interface BusquedaResponse {
  ok: boolean;
  resultados: any[];
}

export interface BusquedaGlobalResponse {
  ok: boolean;
  usuarios: Usuario[];
  medicos: Medico[];
  hospitales: Hospital[];
}
