import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria-equipamento';
import { API_URL, APIResponse } from '../../api/api';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const LS_KEY = "categoriasEquipamento";

@Injectable({
  providedIn: 'root'
})

export class CategoriaEquipamentoService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  }

  constructor(private httpClient: HttpClient){}

  // Observable
  listarTodas(): Observable<Categoria[]> {
    return this.httpClient.get<APIResponse<Categoria[]>>(
      API_URL + "/categoria",
      this.httpOptions
    ).pipe(
      map((res) => res.body)
    );
  }


  // Observable
  inserir(categoria: Categoria): Observable<any> {
    return this.httpClient.post<APIResponse<any>>(
      API_URL + "/categoria",
      JSON.stringify(categoria),
      this.httpOptions
    ).pipe(
      map((res) => res.body)
    )
  }



  // Observable
  buscarPorId(id: number): Observable<Categoria>{
    return this.httpClient.get<APIResponse<Categoria>>(
      API_URL + "/categoria/" + id,
      this.httpOptions
    ).pipe(
      map((res) => res.body)
    )
  }



  // Observable
  atualizar(id: number, desc: string): Observable<any>{
    return this.httpClient.put<APIResponse<Categoria>>(
      API_URL + "/categoria/" + id,
      this.httpOptions
    ).pipe(
      map((res) => res.body)
    )
  }

  // Observable
  remover(id: number) {
    return this.httpClient.delete(
      API_URL + "/categoria/" + id,
      this.httpOptions
    )
  }
}
