import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Hospital } from '../../../models/hospital.model';
import { Medico } from '../../../models/medico.model';
import { HospitalService } from './../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public medicoSeleccionado: Medico;
  public hospitalSeleccionado: Hospital;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarMedico(id);
    });

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges.subscribe((hospitalId) => {
      this.hospitalSeleccionado = this.hospitales.find(
        (hosp) => hosp._id === hospitalId
      );
    });
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      this.hospitales = hospitales;
    });
  }

  cargarMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.medicoService
      .getMedicoById(id)
      .pipe(delay(100))
      .subscribe({
        next: (medico) => {
          this.medicoSeleccionado = medico;
          this.medicoForm.setValue({
            nombre: medico.nombre,
            hospital: medico.hospital._id,
          });
        },
        error: () => {
          this.router.navigateByUrl('/dashboard/medicos');
        },
      });
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      // Actializar
      const data: Medico = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id,
      };
      this.medicoService.actualizarMedico(data).subscribe(() => {
        Swal.fire(
          'Médico actualizado!',
          `El médico ${nombre} se actualizó correctamente`,
          'success'
        );
      });
    } else {
      // Crear
      this.medicoService
        .crearMedico(this.medicoForm.value)
        .subscribe((resp) => {
          Swal.fire(
            'Médico creado!',
            `El médico ${nombre} se creó correctamente`,
            'success'
          );
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        });
    }
  }
}
