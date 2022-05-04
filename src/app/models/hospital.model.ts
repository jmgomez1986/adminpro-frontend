import { HospitalUser } from '../interfaces/hospital-user.interface';

export class Hospital {
  constructor(
    public nombre: string,
    public _id?: string,
    public usuario?: HospitalUser,
    public img?: string
  ) {}
}
