import { Endereco } from './endereco';
export class Usuario {
  id: number;
  nome: string;
  cpf: string;
  tipoUsuario: string;
  email: string;
  telefone: string;
  endereco: Endereco;

  constructor(
    nome: string,
    cpf: string,
    tipoUsuario: string,
    email: string,
    telefone: string,
    endereco: Endereco
  ) {
    this.id = 0;
    this.nome = nome;
    this.cpf = cpf;
    this.tipoUsuario = tipoUsuario;
    this.email = email;
    this.telefone = telefone;
    this.endereco = endereco;
  }
}
