import { Usuario } from "../app/models/usuario";
import { APIResponse, POST_PROMISED } from "./api";

export interface LoginInput {
    email: string,
    password: string
}
export async function login(input: LoginInput): Promise<APIResponse<any>> {
    return await POST_PROMISED({
        route: "auth/login",
        body: input
    })
}

export interface AutocadastroInput {
    email: string,
    nome: string,
    cpf: string,
    telefone: string,
    cep: string,
    numero: number;
}
export async function autocadastro(input: AutocadastroInput): Promise<APIResponse<any>> {
    return await POST_PROMISED({
        route: "auth/autocadastro",
        body: input
    })
}