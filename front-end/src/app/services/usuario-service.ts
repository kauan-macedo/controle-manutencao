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

}