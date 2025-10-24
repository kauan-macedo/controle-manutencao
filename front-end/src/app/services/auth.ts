import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';
import { Usuario } from '../models/usuario';
import * as api from '../../api/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'usuarios';

  constructor(private storageService: StorageService) {
    this.criarFuncionarioTeste();
  }


  //criando um usuario do perfil funcionario para testar o login:
  //
  private criarFuncionarioTeste(): void {
    
    const dados = this.storageService.getDados(this.STORAGE_KEY);
    
    // Se já houver um array de usuários, ele não é sobrescrito.
    // Desse modo, eu posso cadastrar um funcionário e, em seguida,
    // realizar login com ele
    /*if(dados.length = 0){return};
    
    const funcionarioAdmin = new Usuario(
      'Gabriel',
      'gabriel@gmail.com',
      '11111111111',
      '999999999',
      'FUNCIONARIO'
    );
    const clienteTeste = new Usuario(
      'Maria', 
      'maria@gmail.com', 
      '22222222222', 
      '888888888', 
      'CLIENTE' 
    );
    clienteTeste.id = 2; 
    clienteTeste.senha = '1234';
    funcionarioAdmin.id = 1;
    funcionarioAdmin.senha = '1234';

    this.storageService.salvarDados(this.STORAGE_KEY, [funcionarioAdmin, clienteTeste])*/
  }

  async login(email: string, senha: string, onSuccess: (u: Usuario) => void, onError?: (msg: string) => void) {
    let body = {
      email: email,
      password: senha
    }
    let resp = await api.login(body)
    if(resp.error) {
      onError?.(resp.message);
    } else {
      localStorage.setItem('usuarioLogado', resp.body);
      onSuccess(resp.body);
    }
  }

  logout(): void {
    this.storageService.removerItem('usuarioLogado');
  }

  
  getUsuarioLogado(): Usuario | null {
    const dados = localStorage.getItem('usuarioLogado');
    if (dados) {
      return JSON.parse(dados) as Usuario;
    }
    return null;
  }

}
