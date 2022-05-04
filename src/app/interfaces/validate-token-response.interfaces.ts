import { Usuario } from '../models/usuario.model';

export interface RenewTokenResponse {
  ok: boolean;
  msg: string;
  token: string;
  usuario: Usuario,
  menu: any
}
