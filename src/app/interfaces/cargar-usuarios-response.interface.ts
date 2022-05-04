import { Usuario } from '../models/usuario.model';

export interface CargarUsuariosResponse {
  ok: boolean;
  totalReg: number;
  uid: string;
  usuarios: Usuario[];
}
