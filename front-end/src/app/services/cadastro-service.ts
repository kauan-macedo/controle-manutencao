import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import * as api from '../../api/auth';
import { Observable } from 'rxjs';
import { API_URL, APIResponse } from '../../api/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true
  }


  constructor(private httpClient: HttpClient) {}

  registrarUsuario(usuarioDados: Usuario): Observable<APIResponse<any>> {
    let body: api.AutocadastroInput = {
      email: usuarioDados.email,
      nome: usuarioDados.nome,
      telefone: usuarioDados.telefone,
      cep: usuarioDados.endereco.cep,
      cpf: usuarioDados.cpf,
      numero: parseInt(usuarioDados.endereco.numero)
    }

    return this.httpClient.post<APIResponse<any>>(
      API_URL + "/auth/autocadastro",
      body,
      this.httpOptions
    )
  }

}
