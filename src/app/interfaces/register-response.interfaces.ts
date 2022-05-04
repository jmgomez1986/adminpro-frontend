import { Usuario } from '../models/usuario.model';

export interface RegisterResponse {
  ok: boolean;
  token: string;
  usuario: Usuario;
  email: string;
  google: boolean;
  nombre: string;
  role: string;
  uid: string;
  menu: any
}
