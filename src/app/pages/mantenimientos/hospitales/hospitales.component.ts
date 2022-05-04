import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { HospitalService } from './../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Hospital } from './../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public subs: Subscription;
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();

    this.subs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(() => {
        this.cargarHospitales();
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      this.hospitales = hospitales;
      this.hospitalesTemp = hospitales;
      this.cargando = false;
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService
      .actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(() => {
        Swal.fire(
          'Actualizado!',
          `El hospital ${hospital.nombre} fue actualizado con éxito`,
          'success'
        );
      });
  }

  borrarHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Borrar hospital?',
      text: `Está a punto de borrar el hospital ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.eliminarHospital(hospital._id).subscribe(() => {
          Swal.fire(
            'Hospital borrado!',
            `El hospital ${hospital.nombre} se borró correctamente`,
            'success'
          );
          this.cargarHospitales();
        });
      }
    });
  }

  async abrirSweetAlert() {
    const { value } = await Swal.fire<string>({
      title: 'Crear hospital',
      input: 'text',
      text: 'Ingrese el nombre del nuevo hospital',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
      inputValidator: (input) => !input && 'Debe ingresar un nombre!',
    });

    if (value && value.trim().length > 0) {
      this.hospitalService.crearHospital(value).subscribe((resp) => {
        Swal.fire(`Nombre ingresado: ${value}`);
        this.cargarHospitales();
      });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      'hospitales',
      hospital._id,
      hospital.img
    );
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.hospitales = this.hospitalesTemp;
      return;
    }
    this.cargando = true;
    this.busquedasService
      .buscar('hospitales', termino)
      .subscribe((resultados: Hospital[]) => {
        this.hospitales = resultados;
        this.cargando = false;
      });
  }
}
