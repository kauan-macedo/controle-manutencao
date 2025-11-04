import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL, APIResponse } from "../../api/api";
import { Usuario } from "../models/usuario";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    private httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json'
        }),
        withCredentials: true
    }
    
    constructor(private httpClient: HttpClient){}

    buscarFuncionarios(): Observable<APIResponse<Usuario[]>> {
        return this.httpClient.get<APIResponse<Usuario[]>>(
            API_URL + "/user/funcionario",
            this.httpOptions
        )
    }

    salvarFuncionario(id: number, email: string, nome: string): Observable<APIResponse<any>> {
        return this.httpClient.put<APIResponse<any>>(
            API_URL + "/user/" + id,
            ({
                nome: nome,
                email: email
            }),
            this.httpOptions
        )
    }

    criarFuncionario(nome: string, email: string, dtNasc: string, senha: string): Observable<APIResponse<any>> {
        return this.httpClient.post<APIResponse<any>>(
            API_URL + "/user",
            ({
                nome: nome,
                email: email,
                dt_nascimento: dtNasc,
                senha: senha
            }),
            this.httpOptions
        )
    }

    inativarFuncionario(id: number): Observable<APIResponse<any>> {
        return this.httpClient.delete<APIResponse<any>>(
            API_URL + "/user/" + id,
            this.httpOptions
        )
    }

}