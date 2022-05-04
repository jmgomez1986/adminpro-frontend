import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, map, catchError, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { RegisterForm } from '../interfaces/registrar-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterResponse } from '../interfaces/register-response.interfaces';
import { LoginResponse } from '../interfaces/login-response.interfaces';
import { RenewTokenResponse } from '../interfaces/validate-token-response.interfaces';
import { Usuario } from '../models/usuario.model';
import { UpdateProfileResponse } from '../interfaces/update-profile-response.interfaces';
import { CargarUsuariosResponse } from '../interfaces/cargar-usuarios-response.interface';
import { HeadersHttp } from '../interfaces/headers.interface';

const BASE_URL = environment.baseUrl;

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers(): HeadersHttp {
    return {
      headers: { 'x-token': this.token },
    };
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }

  guardarLocaltorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  googleInit() {
    return new Promise<void>((resolve) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          clientId:
            '80746467600-dm1vkbgftkp1655i96ur49gftv5rl3n5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  validarToken(): Observable<boolean> {
    return this.http.get<any>(`${BASE_URL}/login/renew`, this.headers).pipe(
      map((resp: RenewTokenResponse) => {
        const { email, google, nombre, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        this.guardarLocaltorage(resp.token, resp.menu);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  crearUsuario(formData: RegisterForm): Observable<RegisterResponse> {
    return this.http
      .post<RegisterResponse>(`${BASE_URL}/usuarios`, formData)
      .pipe(
        tap((resp) => {
          this.guardarLocaltorage(resp.token, resp.menu);
        })
      );
  }

  actualizarPerfil(data: {
    email: string;
    nombre: string;
    role: string;
  }): Observable<UpdateProfileResponse> {
    data = { ...data, role: this.usuario.role };
    return this.http.put<UpdateProfileResponse>(
      `${BASE_URL}/usuarios/${this.uid}`,
      data,
      this.headers
    );
  }

  login(formData: LoginForm): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${BASE_URL}/login`, formData).pipe(
      tap((resp) => {
        this.guardarLocaltorage(resp.token, resp.menu);
      })
    );
  }

  loginGoogle(token: string): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/login/google`, { token }).pipe(
      tap((resp) => {
        this.guardarLocaltorage(resp.token, resp.menu);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    gapi.auth2.getAuthInstance();
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  cargarUsuarios(desde = 0, limite = 5) {
    const url = `${BASE_URL}/usuarios?desde=${desde}&limite=${limite}`;
    return this.http.get<CargarUsuariosResponse>(url, this.headers).pipe(
      map((resp) => {
        const usuarios = resp.usuarios.map(
          (user) =>
            new Usuario(
              user.nombre,
              user.email,
              user.password,
              user.img,
              user.google,
              user.role,
              user.uid
            )
        );
        return { ...resp, usuarios };
      })
    );
  }

  eliminarUsuario(usuario: Usuario) {
    return this.http.delete<any>(
      `${BASE_URL}/usuarios/${usuario.uid}`,
      this.headers
    );
  }

  guardarUsuario(usuario: Usuario): Observable<UpdateProfileResponse> {
    return this.http.put<UpdateProfileResponse>(
      `${BASE_URL}/usuarios/${usuario.uid}`,
      usuario,
      this.headers
    );
  }
}
