import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';
import { Usuario } from '../models/usuario';
import * as api from '../../api/auth';
import {Observable} from 'rxjs';
import {API_URL, APIResponse} from '../../api/api';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true
  }

  constructor(private httpClient: HttpClient) {}

  login(email: string, senha: string): Observable<APIResponse<Usuario>> {
    let body = {
      email: email,
      password: senha
    }
    return this.httpClient.post<APIResponse<Usuario>>(
      `${API_URL}/auth/login`,
      body,
      this.httpOptions
    );
  }

  logout(): Observable<APIResponse<any>> {
    return this.httpClient.post<APIResponse<any>>(
      `${API_URL}/auth/logout`,
      ({}),
      this.httpOptions
    );
  }

}
