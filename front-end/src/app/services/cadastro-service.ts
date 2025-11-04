import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { StorageService } from './storage-service';
import * as api from '../../api/auth';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  
  private readonly STORAGE_KEY = 'usuarios';

  constructor(private storageService: StorageService) {}

  async registrarUsuario(usuarioDados: Usuario, onSuccess: (msg: string) => void, onError: (msg: string) => void) {
    let body: api.AutocadastroInput = {
      email: usuarioDados.email,
      nome: usuarioDados.nome,
      telefone: usuarioDados.telefone,
      cep: usuarioDados.endereco.cep,
      cpf: usuarioDados.cpf,
      numero: parseInt(usuarioDados.endereco.numero)
    }

    let resp = await api.autocadastro(body);
    if(resp.error) {
      onError(resp.message);
    } else {
      onSuccess(resp.message);
    }
  }

}
