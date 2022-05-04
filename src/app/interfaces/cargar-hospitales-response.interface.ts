import { HospitalUser } from './hospital-user.interface';

interface Hospital {
  nombre: string;
  usuarios: HospitalUser;
  _id: string;
}

export interface CargarHospitalesResponse {
  hospitales: Hospital[];
  ok: boolean;
  uid: string;
}
