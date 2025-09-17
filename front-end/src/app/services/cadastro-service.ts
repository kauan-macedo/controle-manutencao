import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private readonly STORAGE_KEY = 'usuarios';

  constructor(private storageService: StorageService) {}

  private gerarSenha(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  registrarUsuario(usuarioDados: Usuario): void {
    const usuarios = this.storageService.getDados(this.STORAGE_KEY) || [];

    let proximoId;
    if (usuarios.length > 0) {
      proximoId = Math.max(...usuarios.map((u) => u.id)) + 1;
    } else {
      proximoId = 1;
    }

    usuarioDados.id = proximoId;

    usuarioDados.senha = this.gerarSenha();
     usuarioDados.perfil = 'CLIENTE';
    usuarios.push(usuarioDados);
    this.storageService.salvarDados(this.STORAGE_KEY, usuarios);
  }

  login(email: string, senha: string): Usuario | null {
    const usuarios: Usuario[] = this.storageService.getDados(this.STORAGE_KEY) || [];
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);
    
    if (usuarioEncontrado) {
      this.storageService.salvarDados('usuarioLogado', usuarioEncontrado);
      return usuarioEncontrado;
    }

    return null;
  }
}
