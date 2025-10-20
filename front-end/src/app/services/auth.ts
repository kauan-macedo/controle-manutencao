import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';
import { Usuario } from '../models/usuario';
import { APIRequest, POST, APIResponse } from '../../api/api';
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

  login(email: string, senha: string, onSuccess: (t: Usuario) => void, onError?: () => void) {
  
    let body = {
      email: email,
      password: senha
    }
  
    POST(new APIRequest("auth/login", null, body, null), (resp: APIResponse<Usuario>) => {
      debugger
      let mensagem = resp.message;
      if(resp.status != 200) {
        onError?.();
      } else {
        onSuccess(resp.body)
      }
    })

    /*const usuarios: Usuario[] = this.storageService.getDados(this.STORAGE_KEY) || [];
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);
      
    if (usuarioEncontrado) {
      this.storageService.salvarDados('usuarioLogado', usuarioEncontrado);
      return usuarioEncontrado;
    }
  
    return null;*/
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
