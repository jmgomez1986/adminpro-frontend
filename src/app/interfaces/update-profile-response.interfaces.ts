import { Usuario } from './../models/usuario.model';

export interface UpdateProfileResponse {
  ok: boolean;
  usuarioActualizado: Usuario;
}
