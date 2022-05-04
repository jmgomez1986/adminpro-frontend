import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.css'],
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', [Validators.required, this.passwordsIguales]],
    terminos: [false, Validators.requiredTrue],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  crearUsuario() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.usuarioService.crearUsuario(this.registerForm.value).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        Swal.fire('Error!', err.error.msg, 'error');
      },
    });
  }

  campoNoValido(campo: string): boolean {
    return this.registerForm.get(campo)?.invalid && this.formSubmitted
      ? true
      : false;
  }

  contrasenasNoValidas(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    return pass1 !== pass2 && this.formSubmitted ? true : false;
  }

  passwordsIguales(control: AbstractControl): ValidationErrors | null {
    const pass1 = control.parent?.get('password')?.value;
    const pass2 = control.value;
    return !pass1 || !pass2 || pass1 !== pass2 ? { noEsIgual: true } : null;
  }
}
