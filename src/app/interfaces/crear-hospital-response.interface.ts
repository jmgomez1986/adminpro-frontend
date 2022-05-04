interface HospitalResponse {
  nombre: string;
  usuario: string;
  _id: string;
}

export interface CrearHospitalResponse {
  ok: boolean;
  hospital: HospitalResponse;
}
