
export class Usuario {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    perfil: string;
    senha: string;


constructor(
    nome: string,
    email: string,
    cpf: string,
    telefone: string,
    perfil: string = 'CLIENTE'
) {
    this.id = 0;
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.telefone = telefone;
    this.perfil = perfil;
    this.senha = '';
    }
}