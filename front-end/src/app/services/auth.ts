import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'usuarios';

  constructor(private storageService: StorageService) {
    this.criarFuncionarioTeste();
  }


  //criando um usuario do perfil funcionario para testar o login
  private criarFuncionarioTeste(): void {
  const funcionarioAdmin = new Usuario(
    'Gabriel',
    'gabriel@gmail.com',
    '11111111111',
    '999999999',
    'FUNCIONARIO'
  );
  funcionarioAdmin.id = 1;
  funcionarioAdmin.senha = '1234';

  this.storageService.salvarDados(this.STORAGE_KEY, [funcionarioAdmin])
}

  login(email: string, senha: string): Usuario | null {
    const usuarios: Usuario[] =
      this.storageService.getDados(this.STORAGE_KEY) || [];

    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuarioEncontrado) {
      this.storageService.salvarDados('usuarioLogado', usuarioEncontrado);
      return usuarioEncontrado;
    }

    return null;
  }
}
