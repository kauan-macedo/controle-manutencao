import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria-equipamento';
import { atualizarCategoria, buscaCategoria, buscarCategorias, novaCategoria } from '../../api/categoria';
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
      API_URL,
      this.httpOptions
    ).pipe(
      map((res) => res.body)
    );
  }
  
  /* PROMISE
  async listarTodas(onError?: (msg: string) => void): Promise<CategoriaEquipamento[]> {
    let resp = await buscarCategorias();
    if(resp.error && onError) {
      onError(resp.message)
    }
    return resp.body
  };
  */

  // Observable
  inserir(categoria: Categoria): Observable<any> {
    return this.httpClient.post<APIResponse<any>>(
      API_URL,
      JSON.stringify(categoria),
      this.httpOptions
    ).pipe(
      map((res) => res.body)
    )
  }

  /* PROMISE
  async inserir(descricao: string, onError?: (msg: string) => void): Promise<any> {
    let resp = await novaCategoria(descricao);
    if(resp.error && onError) {
      onError(resp.message)
    }
    return resp.body
  };
  */  

  // Observable
  buscarPorId(id: number): Observable<Categoria>{
    return this.httpClient.get<APIResponse<Categoria>>(
      API_URL + "/" + id,
      this.httpOptions
    ).pipe(
      map((res) => res.body)
    )
  }

  /* PROMISE
  async buscarPorId(id: number, onError?: (msg: string) => void): Promise<CategoriaEquipamento> {
    let resp = await buscaCategoria(id);
    if(resp.error && onError) {
      onError(resp.message)
    }
    return resp.body
  }
  */

  // Observable
  atualizar(id: number, desc: string): Observable<any>{
    return this.httpClient.put<APIResponse<Categoria>>(
      API_URL + "/" + id,
      this.httpOptions
    ).pipe(
      map((res) => res.body)
    )
  }

  /* PROMISE
  async atualizar(id: number, desc: string, onError?: (msg: string) => void): Promise<any> {
    let resp = await atualizarCategoria(id, desc);
    if(resp.error && onError) {
      onError(resp.message)
    }
    return resp.body
  };
  */

  // Observable
  remover(id: number) {
    return this.httpClient.delete(
      API_URL + "/" + id,
      this.httpOptions
    )
  }

  /* PROMISE
  async remover(id: number, onError?: (msg: string) => void): Promise<any> {
    let resp = await atualizarCategoria(id, "");
    if(resp.error && onError) {
      onError(resp.message)
    }
    return resp.body
  };
  */
}
