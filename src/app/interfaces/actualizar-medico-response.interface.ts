interface _Medico {
  nombre: string;
  usuario: string;
  hospital: string;
  _id: string;
}

export interface ActualizarMedicoResponse {
  ok: boolean;
  msg: string;
  medico: _Medico;
}
